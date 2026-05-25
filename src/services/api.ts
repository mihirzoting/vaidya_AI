export type SymptomResponse = {
  detected_language: string;
  symptoms_extracted: string[];
  severity: { level: "LOW" | "MODERATE" | "EMERGENCY" };
  possible_conditions: { name: string; info: string }[];
  nearby_clinics: {
    name: string;
    type: "PHC" | "CHC";
    distance_km: number;
    address: string;
    phone: string;
    timings: string;
  }[];
  disclaimer: string;
};

const MOCK: SymptomResponse = {
  detected_language: "hi",
  symptoms_extracted: ["Fever", "Headache", "Body Ache"],
  severity: { level: "MODERATE" },
  possible_conditions: [
    {
      name: "Viral Fever",
      info: "A common viral illness causing fever, body ache and fatigue. Usually self-limiting and resolves with rest and hydration over 3–5 days.",
    },
    {
      name: "Seasonal Influenza",
      info: "A respiratory illness with fever, headache, and body ache. Most people recover with rest; high-risk individuals should consult a doctor early.",
    },
  ],
  nearby_clinics: [
    {
      name: "Primary Health Centre, Rampur",
      type: "PHC",
      distance_km: 4.2,
      address: "Village Rampur, Block Sadar, District Aligarh",
      phone: "+91 98765 43210",
      timings: "Mon–Sat, 9:00 AM – 5:00 PM",
    },
    {
      name: "Community Health Centre, Khair",
      type: "CHC",
      distance_km: 7.8,
      address: "Khair Road, District Aligarh, Uttar Pradesh",
      phone: "+91 98765 12345",
      timings: "24x7 Emergency Available",
    },
  ],
  disclaimer:
    "Vaidya AI is a triage and routing assistant only. It does not provide medical advice, prescriptions, or clinical assessments. Please consult a qualified doctor for any health concern.",
};

export async function checkSymptoms(input: {
  text: string;
  latitude: number | null;
  longitude: number | null;
  language: string;
}): Promise<SymptomResponse> {
  try {
    const ctrl = new AbortController();
    const timeout = setTimeout(() => ctrl.abort(), 2500);
    const res = await fetch("http://localhost:8000/api/v1/symptom-check", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
      signal: ctrl.signal,
    });
    clearTimeout(timeout);
    if (!res.ok) throw new Error("Backend error");
    return (await res.json()) as SymptomResponse;
  } catch {
    await new Promise((r) => setTimeout(r, 1200));
    return adaptMock(input.text);
  }
}

function adaptMock(text: string): SymptomResponse {
  const t = text.toLowerCase();
  if (/(chest pain|seene|saans|breath|unconscious|बेहोश|दर्द.*सीने)/i.test(t)) {
    return {
      ...MOCK,
      symptoms_extracted: ["Chest Pain", "Shortness of Breath", "Dizziness"],
      severity: { level: "EMERGENCY" },
      possible_conditions: [
        { name: "Acute Cardiac Event", info: "Chest pain with breathlessness can indicate a serious cardiac condition requiring immediate emergency care." },
        { name: "Severe Anxiety / Panic", info: "Acute panic episodes can mimic cardiac symptoms but still require urgent medical evaluation." },
      ],
    };
  }
  if (/(आंख|jalan|eye|burning)/i.test(t)) {
    return {
      ...MOCK,
      detected_language: /[\u0900-\u097F]/.test(t) ? "hi" : "en",
      symptoms_extracted: ["Eye Irritation", "Burning Sensation"],
      severity: { level: "LOW" },
      possible_conditions: [
        { name: "Allergic Conjunctivitis", info: "Eye irritation and burning from allergens such as dust or pollen, often resolving with cool compresses." },
        { name: "Dry Eye", info: "Common from screen use or dry climate; lubricating drops and rest typically help." },
      ],
    };
  }
  return { ...MOCK, detected_language: /[\u0900-\u097F]/.test(t) ? "hi" : "en" };
}