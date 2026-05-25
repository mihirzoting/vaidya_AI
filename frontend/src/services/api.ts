export type SymptomResponse = {
  detected_language: string;
  symptoms_extracted: { en: string; hi: string }[];
  severity: { level: "LOW" | "MODERATE" | "EMERGENCY" };
  possible_conditions: { name: string; name_hi: string; info: string; info_hi: string }[];
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
  symptoms_extracted: [
    { en: "Fever", hi: "बुखार" },
    { en: "Headache", hi: "सिरदर्द" },
    { en: "Body Ache", hi: "बदन दर्द" },
  ],
  severity: { level: "MODERATE" },
  possible_conditions: [
    {
      name: "Viral Fever",
      name_hi: "वायरल बुखार",
      info: "A common viral illness causing fever, body ache and fatigue. Usually self-limiting and resolves with rest and hydration over 3–5 days.",
      info_hi: "एक सामान्य वायरल बीमारी जिससे बुखार, बदन दर्द और थकान होती है। आराम और तरल पदार्थों से 3–5 दिनों में ठीक हो जाती है।",
    },
    {
      name: "Seasonal Influenza",
      name_hi: "मौसमी फ्लू",
      info: "A respiratory illness with fever, headache, and body ache. Most people recover with rest; high-risk individuals should consult a doctor early.",
      info_hi: "बुखार, सिरदर्द और बदन दर्द के साथ श्वसन संबंधी बीमारी। अधिकांश लोग आराम से ठीक हो जाते हैं; अधिक जोखिम वालों को जल्द डॉक्टर से मिलना चाहिए।",
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
  image?: string | null;
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
      symptoms_extracted: [
        { en: "Chest Pain", hi: "सीने में दर्द" },
        { en: "Shortness of Breath", hi: "सांस लेने में कठिनाई" },
        { en: "Dizziness", hi: "चक्कर आना" },
      ],
      severity: { level: "EMERGENCY" },
      possible_conditions: [
        { name: "Acute Cardiac Event", name_hi: "तीव्र हृदय घटना", info: "Chest pain with breathlessness can indicate a serious cardiac condition requiring immediate emergency care.", info_hi: "सांस की तकलीफ के साथ सीने में दर्द गंभीर हृदय स्थिति का संकेत हो सकता है। तुरंत आपातकालीन देखभाल लें।" },
        { name: "Severe Anxiety / Panic", name_hi: "गंभीर चिंता / पैनिक", info: "Acute panic episodes can mimic cardiac symptoms but still require urgent medical evaluation.", info_hi: "तीव्र पैनिक के दौरे हृदय जैसे लक्षण दिखा सकते हैं, फिर भी तत्काल डॉक्टरी जांच आवश्यक है।" },
      ],
    };
  }
  if (/(आंख|jalan|eye|burning)/i.test(t)) {
    return {
      ...MOCK,
      detected_language: /[\u0900-\u097F]/.test(t) ? "hi" : "en",
      symptoms_extracted: [
        { en: "Eye Irritation", hi: "आंखों में जलन" },
        { en: "Burning Sensation", hi: "जलन की अनुभूति" },
      ],
      severity: { level: "LOW" },
      possible_conditions: [
        { name: "Allergic Conjunctivitis", name_hi: "एलर्जिक कंजंक्टिवाइटिस", info: "Eye irritation and burning from allergens such as dust or pollen, often resolving with cool compresses.", info_hi: "धूल या पराग जैसे एलर्जन्स से आंखों में जलन; ठंडी सिकाई से अक्सर आराम मिलता है।" },
        { name: "Dry Eye", name_hi: "सूखी आंखें", info: "Common from screen use or dry climate; lubricating drops and rest typically help." , info_hi: "स्क्रीन के उपयोग या सूखे मौसम से होती है; लुब्रिकेटिंग ड्रॉप्स और आराम से मदद मिलती है।" },
      ],
    };
  }
  return { ...MOCK, detected_language: /[\u0900-\u097F]/.test(t) ? "hi" : "en" };
}