import type { Language } from "@/i18n/config";

export interface Intent {
  id: string;
  /** Keywords that trigger this intent per language (lowercased). */
  patterns: Record<Language, string[]>;
  /** Spoken/displayed response per language. */
  responses: Record<Language, string>;
}

export const INTENTS: Intent[] = [
  // ── Greetings ────────────────────────────────────────────────────────────
  {
    id: "greeting",
    patterns: {
      en: ["hello", "hi", "hey", "namaste", "good morning", "good afternoon", "good evening", "howdy", "greetings"],
      te: ["నమస్కారం", "నమస్తే", "హలో", "హాయ్", "శుభోదయం", "శుభ సాయంత్రం"],
      hi: ["नमस्ते", "नमस्कार", "हेलो", "हाय", "सुप्रभात", "शुभ संध्या"],
    },
    responses: {
      en: "Hello! I'm SARTHI Assistant 🙏 I can help you:\n• Understand which welfare schemes you may qualify for\n• Guide you through filling the eligibility form\n• Explain any scheme's benefits and criteria\n• Help with voice input and language settings\n\nWhat would you like to know?",
      te: "నమస్కారం! నేను SARTHI సహాయకుడిని 🙏 నేను మీకు:\n• మీరు అర్హత పొందగల సంక్షేమ పథకాలు అర్థం చేసుకోవడంలో\n• అర్హత ఫారం పూరించడంలో మార్గనిర్దేశం చేయడంలో\n• ఏదైనా పథకం యొక్క ప్రయోజనాలు మరియు ప్రమాణాలు వివరించడంలో\n• వాయిస్ ఇన్‌పుట్ మరియు భాష సెట్టింగ్‌లతో సహాయం చేయడంలో\nసహాయం చేయగలను. మీకు ఏమి తెలుసుకోవాలి?",
      hi: "नमस्ते! मैं SARTHI सहायक हूँ 🙏 मैं आपकी मदद कर सकता हूँ:\n• समझने में कि आप किन कल्याण योजनाओं के लिए पात्र हो सकते हैं\n• पात्रता फॉर्म भरने में मार्गदर्शन\n• किसी भी योजना के लाभ और मानदंड समझाने में\n• आवाज़ इनपुट और भाषा सेटिंग्स में मदद\n\nआप क्या जानना चाहते हैं?",
    },
  },

  // ── What is SARTHI ───────────────────────────────────────────────────────
  {
    id: "what_is_sarthi",
    patterns: {
      en: ["what is sarthi", "what is this", "about sarthi", "about this", "what does sarthi do", "explain sarthi", "tell me about", "what can you do", "purpose"],
      te: ["sarthi అంటే ఏమిటి", "ఇది ఏమిటి", "sarthi గురించి", "ఈ వెబ్‌సైట్ గురించి", "sarthi ఏమి చేస్తుంది", "ఏమి చేయగలవు"],
      hi: ["sarthi क्या है", "यह क्या है", "sarthi के बारे में", "इस वेबसाइट के बारे में", "sarthi क्या करता है", "क्या कर सकते हो"],
    },
    responses: {
      en: "SARTHI is Telangana's unified welfare eligibility engine 🏛️\n\nFill your citizen profile once — SARTHI instantly checks you against 16 state welfare schemes covering:\n🌾 Agriculture · 📚 Education · 🏠 Housing\n💊 Healthcare · 👩 Women Welfare · ⚡ Utilities · 🛡️ Insurance\n\nAll matching is done by the backend AI engine. Your data is 256-bit encrypted and only used for eligibility computation.",
      te: "SARTHI తెలంగాణ యొక్క ఏకీకృత సంక్షేమ అర్హత ఇంజిన్ 🏛️\n\nమీ నాగరిక ప్రొఫైల్‌ను ఒకసారి పూరించండి — SARTHI 16 రాష్ట్ర సంక్షేమ పథకాలకు వ్యతిరేకంగా మీ అర్హతను వెంటనే తనిఖీ చేస్తుంది:\n🌾 వ్యవసాయం · 📚 విద్య · 🏠 గృహనిర్మాణం\n💊 ఆరోగ్య సేవలు · 👩 మహిళా సంక్షేమం · ⚡ యుటిలిటీలు · 🛡️ బీమా\n\nమీ డేటా 256-బిట్ ఎన్‌క్రిప్ట్ చేయబడింది మరియు అర్హత గణన కోసం మాత్రమే ఉపయోగించబడుతుంది.",
      hi: "SARTHI तेलंगाना का एकीकृत कल्याण पात्रता इंजन है 🏛️\n\nअपनी नागरिक प्रोफ़ाइल एक बार भरें — SARTHI 16 राज्य कल्याण योजनाओं के विरुद्ध आपकी पात्रता तुरंत जाँचता है:\n🌾 कृषि · 📚 शिक्षा · 🏠 आवास\n💊 स्वास्थ्य सेवा · 👩 महिला कल्याण · ⚡ उपयोगिताएँ · 🛡️ बीमा\n\nआपका डेटा 256-बिट एन्क्रिप्टेड है और केवल पात्रता गणना के लिए उपयोग किया जाता है।",
    },
  },

  // ── Pension / Cheyutha / Aasara ───────────────────────────────────────────
  {
    id: "pension",
    patterns: {
      en: ["pension", "cheyutha", "aasara", "old age", "elderly", "widow pension", "disabled pension"],
      te: ["పెన్షన్", "చేయూత", "ఆసరా", "వృద్ధాప్యం", "వితంతువు పెన్షన్", "వికలాంగుల పెన్షన్"],
      hi: ["पेंशन", "चेयुथा", "आसरा", "वृद्धावस्था", "विधवा पेंशन", "विकलांग पेंशन"],
    },
    responses: {
      en: "🧓 Cheyutha / Aasara Pension\n\nWho qualifies:\n• Age 57 or above, OR\n• Widow / Single woman / Disabled person / Has specific medical condition, OR\n• Specific occupations: Beedi Worker, Handloom Weaver, Toddy Tapper, Stone Cutter\n\nAdditional criteria:\n✔ Permanent Telangana resident\n✔ White ration card holder\n✔ Not a government employee\n✔ Annual income ≤ ₹1.5L (rural) or ₹2L (urban)\n\nBenefit: Monthly pension support from the Telangana government.",
      te: "🧓 చేయూత / ఆసరా పెన్షన్\n\nఎవరు అర్హులు:\n• 57 సంవత్సరాలు లేదా అంతకంటే ఎక్కువ వయసు, లేదా\n• వితంతువు / ఒంటరి మహిళ / వికలాంగుడు / నిర్దిష్ట వైద్య పరిస్థితి ఉన్నవారు, లేదా\n• నిర్దిష్ట వృత్తులు: బీడీ కార్మికుడు, చేనేత కార్మికుడు, కల్లు గీత కార్మికుడు, రాయి కత్తిరింపు కార్మికుడు\n\nఅదనపు ప్రమాణాలు:\n✔ శాశ్వత తెలంగాణ నివాసి\n✔ తెల్ల రేషన్ కార్డు ధారకుడు\n✔ ప్రభుత్వ ఉద్యోగి కాకూడదు\n✔ వార్షిక ఆదాయం ≤ ₹1.5L (గ్రామీణ) లేదా ₹2L (పట్టణ)\n\nప్రయోజనం: తెలంగాణ ప్రభుత్వం నుండి నెలవారీ పెన్షన్ సహాయం.",
      hi: "🧓 चेयुथा / आसरा पेंशन\n\nकौन योग्य है:\n• आयु 57 वर्ष या अधिक, या\n• विधवा / अकेली महिला / विकलांग / विशिष्ट चिकित्सा स्थिति, या\n• विशिष्ट व्यवसाय: बीड़ी कामगार, हथकरघा बुनकर, ताड़ी निकालने वाला, पत्थर काटने वाला\n\nअतिरिक्त मानदंड:\n✔ स्थायी तेलंगाना निवासी\n✔ सफेद राशन कार्ड धारक\n✔ सरकारी कर्मचारी नहीं\n✔ वार्षिक आय ≤ ₹1.5L (ग्रामीण) या ₹2L (शहरी)\n\nलाभ: तेलंगाना सरकार से मासिक पेंशन सहायता।",
    },
  },

  // ── Mahalakshmi ──────────────────────────────────────────────────────────
  {
    id: "mahalakshmi",
    patterns: {
      en: ["mahalakshmi", "mahaalakshmi", "free bus", "tsrtc", "lpg subsidy", "monthly allowance", "women allowance", "2500"],
      te: ["మహాలక్ష్మి", "ఉచిత బస్సు", "tsrtc", "lpg సబ్సిడీ", "నెలవారీ భత్యం"],
      hi: ["महालक्ष्मी", "मुफ्त बस", "tsrtc", "lpg सब्सिडी", "मासिक भत्ता", "2500"],
    },
    responses: {
      en: "👩 Mahalakshmi Scheme\n\nWho qualifies:\n• Any Female or Transgender Telangana resident — that's the only requirement!\n\nBenefits:\n✅ Free TSRTC bus travel\n✅ Subsidized LPG cylinder\n✅ Monthly financial assistance of ₹2,500\n\nThis is one of the broadest women-welfare schemes — if you are female or transgender, you qualify automatically.",
      te: "👩 మహాలక్ష్మి పథకం\n\nఎవరు అర్హులు:\n• ఏదైనా మహిళ లేదా తృతీయలింగ తెలంగాణ నివాసి — ఇది మాత్రమే అవసరం!\n\nప్రయోజనాలు:\n✅ ఉచిత TSRTC బస్సు ప్రయాణం\n✅ సబ్సిడీ LPG సిలిండర్\n✅ నెలవారీ ₹2,500 ఆర్థిక సహాయం\n\nఇది అత్యంత విస్తృతమైన మహిళా సంక్షేమ పథకాలలో ఒకటి — మీరు మహిళ లేదా తృతీయలింగ అయితే, మీరు స్వయంచాలకంగా అర్హులు.",
      hi: "👩 महालक्ष्मी योजना\n\nकौन योग्य है:\n• कोई भी महिला या ट्रांसजेंडर तेलंगाना निवासी — बस यही एकमात्र शर्त है!\n\nलाभ:\n✅ मुफ्त TSRTC बस यात्रा\n✅ सब्सिडीकृत LPG सिलेंडर\n✅ मासिक ₹2,500 वित्तीय सहायता\n\nयह सबसे व्यापक महिला कल्याण योजनाओं में से एक है — यदि आप महिला या ट्रांसजेंडर हैं, तो आप स्वतः पात्र हैं।",
    },
  },

  // ── Marriage Assistance / Kalyana Lakshmi / Shaadi Mubarak ────────────────
  {
    id: "marriage",
    patterns: {
      en: ["marriage", "kalyana lakshmi", "shaadi mubarak", "wedding", "bride", "marriage assistance"],
      te: ["వివాహం", "కళ్యాణ లక్ష్మి", "షాది ముబారక్", "పెళ్ళి", "వధువు"],
      hi: ["विवाह", "कल्याण लक्ष्मी", "शादी मुबारक", "शादी", "दुल्हन"],
    },
    responses: {
      en: "💒 Marriage Assistance (Kalyana Lakshmi / Shaadi Mubarak)\n\nWho qualifies:\n• Female (male applicants are not eligible)\n• Age 18 or above\n• Not an income tax payer\n• Not a government employee\n• Annual household income ≤ ₹2 Lakhs\n\nScheme name depends on your background:\n🔶 Kalyana Lakshmi — for SC, ST, BC, or EBC brides\n🔷 Shaadi Mubarak — for Muslim, Christian, Sikh, Buddhist, Jain, or Parsi brides\n\nBenefit: Financial assistance for marriage expenses.",
      te: "💒 వివాహ సహాయం (కళ్యాణ లక్ష్మి / షాది ముబారక్)\n\nఎవరు అర్హులు:\n• మహిళలు మాత్రమే (పురుష దరఖాస్తుదారులు అర్హులు కాదు)\n• 18 సంవత్సరాలు లేదా అంతకంటే ఎక్కువ వయసు\n• ఆదాయపు పన్ను చెల్లించదారు కాకూడదు\n• ప్రభుత్వ ఉద్యోగి కాకూడదు\n• వార్షిక గృహ ఆదాయం ≤ ₹2 లక్షలు\n\nపథకం పేరు మీ నేపథ్యాన్ని బట్టి ఉంటుంది:\n🔶 కళ్యాణ లక్ష్మి — SC, ST, BC లేదా EBC వధువులకు\n🔷 షాది ముబారక్ — ముస్లిం, క్రిస్టియన్, సిక్కు, బౌద్ధ, జైన్ లేదా పార్సీ వధువులకు",
      hi: "💒 विवाह सहायता (कल्याण लक्ष्मी / शादी मुबारक)\n\nकौन योग्य है:\n• महिला (पुरुष आवेदक पात्र नहीं)\n• आयु 18 वर्ष या अधिक\n• आयकर दाता नहीं\n• सरकारी कर्मचारी नहीं\n• वार्षिक पारिवारिक आय ≤ ₹2 लाख\n\nयोजना का नाम आपकी पृष्ठभूमि पर निर्भर करता है:\n🔶 कल्याण लक्ष्मी — SC, ST, BC या EBC दुल्हनों के लिए\n🔷 शादी मुबारक — मुस्लिम, ईसाई, सिख, बौद्ध, जैन या पारसी दुल्हनों के लिए\n\nलाभ: विवाह खर्च के लिए वित्तीय सहायता।",
    },
  },

  // ── Gruha Jyothi / Free Electricity ──────────────────────────────────────
  {
    id: "electricity",
    patterns: {
      en: ["electricity", "gruha jyothi", "free units", "power bill", "200 units", "light bill", "gruha"],
      te: ["విద్యుత్", "గృహ జ్యోతి", "ఉచిత యూనిట్లు", "కరెంటు బిల్లు", "200 యూనిట్లు", "గృహ"],
      hi: ["बिजली", "गृह ज्योति", "मुफ्त यूनिट", "बिजली बिल", "200 यूनिट", "करंट बिल"],
    },
    responses: {
      en: "⚡ Gruha Jyothi — Free Electricity Scheme\n\nWho qualifies:\n✔ Permanent Telangana resident\n✔ White ration card holder\n✔ Monthly electricity usage ≤ 200 units\n✔ No pending electricity bill dues\n\n⚠️ You are automatically disqualified if:\n• Usage exceeds 200 units/month, OR\n• You have outstanding electricity dues\n\nBenefit: Free electricity up to 200 units per month.",
      te: "⚡ గృహ జ్యోతి — ఉచిత విద్యుత్ పథకం\n\nఎవరు అర్హులు:\n✔ శాశ్వత తెలంగాణ నివాసి\n✔ తెల్ల రేషన్ కార్డు ధారకుడు\n✔ నెలవారీ విద్యుత్ వినియోగం ≤ 200 యూనిట్లు\n✔ విద్యుత్ బిల్లు బకాయిలు లేకూడదు\n\n⚠️ మీరు స్వయంచాలకంగా అనర్హులు అవుతారు:\n• వినియోగం నెలకు 200 యూనిట్లు మించినట్లయితే, లేదా\n• విద్యుత్ బిల్లు బకాయిలు ఉంటే\n\nప్రయోజనం: నెలకు 200 యూనిట్ల వరకు ఉచిత విద్యుత్.",
      hi: "⚡ गृह ज्योति — मुफ्त बिजली योजना\n\nकौन योग्य है:\n✔ स्थायी तेलंगाना निवासी\n✔ सफेद राशन कार्ड धारक\n✔ मासिक बिजली उपयोग ≤ 200 यूनिट\n✔ बकाया बिजली बिल नहीं\n\n⚠️ आप स्वतः अयोग्य हैं यदि:\n• उपयोग 200 यूनिट/माह से अधिक हो, या\n• बकाया बिजली बिल हो\n\nलाभ: प्रति माह 200 यूनिट तक मुफ्त बिजली।",
    },
  },

  // ── Housing ───────────────────────────────────────────────────────────────
  {
    id: "housing",
    patterns: {
      en: ["housing", "indiramma housing", "house scheme", "pucca house", "home assistance", "house benefit", "pmay"],
      te: ["గృహనిర్మాణం", "ఇందిరమ్మ హౌసింగ్", "ఇల్లు పథకం", "పక్కా ఇల్లు", "ఇంటి సహాయం"],
      hi: ["आवास", "इंदिरम्मा हाउसिंग", "घर योजना", "पक्का घर", "घर सहायता", "pmay"],
    },
    responses: {
      en: "🏠 Indiramma Housing Scheme\n\nWho qualifies:\n✔ Permanent Telangana resident\n✔ White ration card holder\n✔ Annual income ≤ ₹2 Lakhs\n✔ Does NOT own a pucca (permanent) house\n✔ Not an income tax payer\n\n⚠️ Automatically disqualified if you already own a pucca house or pay income tax.\n\nBenefit: Up to ₹5 Lakhs financial assistance to build a permanent home.",
      te: "🏠 ఇందిరమ్మ హౌసింగ్ పథకం\n\nఎవరు అర్హులు:\n✔ శాశ్వత తెలంగాణ నివాసి\n✔ తెల్ల రేషన్ కార్డు ధారకుడు\n✔ వార్షిక ఆదాయం ≤ ₹2 లక్షలు\n✔ పక్కా (శాశ్వత) ఇల్లు సొంతంగా లేకూడదు\n✔ ఆదాయపు పన్ను చెల్లించదారు కాకూడదు\n\n⚠️ మీరు ఇప్పటికే పక్కా ఇల్లు కలిగి ఉంటే లేదా ఆదాయపు పన్ను చెల్లిస్తే స్వయంచాలకంగా అనర్హులు.\n\nప్రయోజనం: శాశ్వత ఇల్లు నిర్మించడానికి ₹5 లక్షల వరకు ఆర్థిక సహాయం.",
      hi: "🏠 इंदिरम्मा हाउसिंग स्कीम\n\nकौन योग्य है:\n✔ स्थायी तेलंगाना निवासी\n✔ सफेद राशन कार्ड धारक\n✔ वार्षिक आय ≤ ₹2 लाख\n✔ पक्का (स्थायी) घर का मालिक नहीं\n✔ आयकर दाता नहीं\n\n⚠️ यदि आपके पास पहले से पक्का घर है या आयकर देते हैं तो स्वतः अयोग्य।\n\nलाभ: स्थायी घर बनाने के लिए ₹5 लाख तक वित्तीय सहायता।",
    },
  },

  // ── Agriculture (Rythu Bharosa + Rythu Bima) ──────────────────────────────
  {
    id: "agriculture",
    patterns: {
      en: ["rythu bharosa", "rythu bima", "farmer", "agriculture", "pattadar", "cultivable land", "farm", "investment support", "farmer insurance"],
      te: ["రైతు బంధు", "రైతు భీమా", "రైతు", "వ్యవసాయం", "పట్టాదారు", "సాగు భూమి", "వ్యవసాయ సహాయం"],
      hi: ["रैतु बंधु", "रैतु बीमा", "किसान", "कृषि", "पट्टादार", "खेती की जमीन", "किसान बीमा"],
    },
    responses: {
      en: "🌾 Agriculture Schemes\n\n1️⃣ Rythu Bharosa — Investment Support\nRequires: Permanent resident + Pattadar (land owner) + Cultivable land + Active farmer\nBenefit: Seasonal investment support for farming.\n\n2️⃣ Rythu Bima — Life Insurance for Farmers\nRequires: Permanent resident + Pattadar + Cultivable land + Age 18–59\nBenefit: ₹5 Lakh life insurance coverage.\n\n⚠️ Both schemes require you to be a registered Pattadar (official land record owner) with cultivable land.",
      te: "🌾 వ్యవసాయ పథకాలు\n\n1️⃣ రైతు భరోసా — పెట్టుబడి సహాయం\nఅవసరాలు: శాశ్వత నివాసి + పట్టాదారు (భూయజమాని) + సాగు భూమి + చురుకుగా పనిచేసే రైతు\nప్రయోజనం: వ్యవసాయ సీజన్ పెట్టుబడి సహాయం.\n\n2️⃣ రైతు భీమా — రైతులకు జీవిత బీమా\nఅవసరాలు: శాశ్వత నివాసి + పట్టాదారు + సాగు భూమి + 18–59 సంవత్సరాల వయసు\nప్రయోజనం: ₹5 లక్షల జీవిత బీమా.\n\n⚠️ రెండు పథకాలకూ మీరు సాగు భూమితో నమోదిత పట్టాదారు (అధికారిక భూమి రికార్డు యజమాని) అయి ఉండాలి.",
      hi: "🌾 कृषि योजनाएँ\n\n1️⃣ रैतु भरोसा — निवेश सहायता\nआवश्यकताएँ: स्थायी निवासी + पट्टादार (भूमि मालिक) + खेती योग्य भूमि + सक्रिय किसान\nलाभ: मौसमी कृषि निवेश सहायता।\n\n2️⃣ रैतु बीमा — किसानों के लिए जीवन बीमा\nआवश्यकताएँ: स्थायी निवासी + पट्टादार + खेती योग्य भूमि + आयु 18–59\nलाभ: ₹5 लाख जीवन बीमा कवरेज।\n\n⚠️ दोनों योजनाओं के लिए आपको खेती योग्य भूमि के साथ पंजीकृत पट्टादार होना आवश्यक है।",
    },
  },

  // ── Insurance (Indiramma Family Life Insurance) ───────────────────────────
  {
    id: "insurance",
    patterns: {
      en: ["indiramma insurance", "family insurance", "life insurance", "life cover", "indiramma life"],
      te: ["ఇందిరమ్మ బీమా", "కుటుంబ బీమా", "జీవిత బీమా", "ఇందిరమ్మ జీవిత"],
      hi: ["इंदिरम्मा बीमा", "परिवार बीमा", "जीवन बीमा", "इंदिरम्मा जीवन"],
    },
    responses: {
      en: "🛡️ Indiramma Family Life Insurance Scheme\n\nWho qualifies:\n✔ Permanent Telangana resident\n✔ Not an income tax payer\n✔ Not a government employee\n\n⚠️ Income tax payers and government employees are automatically excluded.\n\nBenefit: ₹5 Lakh life insurance cover for the family.",
      te: "🛡️ ఇందిరమ్మ కుటుంబ జీవిత బీమా పథకం\n\nఎవరు అర్హులు:\n✔ శాశ్వత తెలంగాణ నివాసి\n✔ ఆదాయపు పన్ను చెల్లించదారు కాకూడదు\n✔ ప్రభుత్వ ఉద్యోగి కాకూడదు\n\n⚠️ ఆదాయపు పన్ను చెల్లించదారులు మరియు ప్రభుత్వ ఉద్యోగులు స్వయంచాలకంగా మినహాయించబడతారు.\n\nప్రయోజనం: కుటుంబానికి ₹5 లక్షల జీవిత బీమా.",
      hi: "🛡️ इंदिरम्मा परिवार जीवन बीमा योजना\n\nकौन योग्य है:\n✔ स्थायी तेलंगाना निवासी\n✔ आयकर दाता नहीं\n✔ सरकारी कर्मचारी नहीं\n\n⚠️ आयकर दाता और सरकारी कर्मचारी स्वतः बाहर हैं।\n\nलाभ: परिवार के लिए ₹5 लाख जीवन बीमा कवर।",
    },
  },

  // ── Nutrition / Aarogya Lakshmi ───────────────────────────────────────────
  {
    id: "nutrition",
    patterns: {
      en: ["aarogya lakshmi", "nutrition", "pregnant", "lactating", "anganwadi", "child nutrition", "aarogya"],
      te: ["ఆరోగ్య లక్ష్మి", "పోషణ", "గర్భవతి", "బాలింత", "అంగన్‌వాడి", "పిల్లల పోషణ"],
      hi: ["आरोग्य लक्ष्मी", "पोषण", "गर्भवती", "स्तनपान", "आंगनवाड़ी", "बाल पोषण"],
    },
    responses: {
      en: "💊 Aarogya Lakshmi — Nutritious Meal Programme\n\nWho qualifies:\n✔ Permanent Telangana resident\n✔ One of these conditions:\n  • Pregnant woman\n  • Lactating (breastfeeding) mother\n  • Child aged 7–72 months\n\n⚠️ Male applicants are automatically excluded. Must be pregnant, lactating, or have a young child.\n\nBenefit: Free nutritious meals provided at Anganwadi centres.",
      te: "💊 ఆరోగ్య లక్ష్మి — పోషకాహార భోజన కార్యక్రమం\n\nఎవరు అర్హులు:\n✔ శాశ్వత తెలంగాణ నివాసి\n✔ ఈ పరిస్థితులలో ఒకటి:\n  • గర్భవతి మహిళ\n  • బాలింత (తల్లి పాలు ఇచ్చే) తల్లి\n  • 7–72 నెలల వయసు గల పిల్లవాడు\n\n⚠️ పురుష దరఖాస్తుదారులు స్వయంచాలకంగా అనర్హులు. గర్భవతిగా, బాలింతగా ఉండాలి లేదా చిన్న పిల్లవాడు ఉండాలి.\n\nప్రయోజనం: అంగన్‌వాడి కేంద్రాల్లో ఉచిత పోషకాహార భోజనం.",
      hi: "💊 आरोग्य लक्ष्मी — पोषण भोजन कार्यक्रम\n\nकौन योग्य है:\n✔ स्थायी तेलंगाना निवासी\n✔ इनमें से एक स्थिति:\n  • गर्भवती महिला\n  • स्तनपान कराने वाली माँ\n  • 7–72 माह की आयु का बच्चा\n\n⚠️ पुरुष आवेदक स्वतः अयोग्य। गर्भवती, स्तनपान कराने वाली होनी चाहिए या छोटा बच्चा होना चाहिए।\n\nलाभ: आंगनवाड़ी केन्द्रों पर मुफ्त पोषक भोजन।",
    },
  },

  // ── Education Scholarships ────────────────────────────────────────────────
  {
    id: "education",
    patterns: {
      en: ["scholarship", "education", "student", "ambedkar", "overseas", "pre-matric", "epass", "study abroad", "minority scholarship", "bc scholarship", "post-matric", "post matric", "tuition fee", "skill upgradation", "gre", "gmat", "toefl", "ielts", "exam fee"],
      te: ["స్కాలర్‌షిప్", "విద్య", "విద్యార్థి", "అంబేద్కర్", "విదేశీ చదువు", "ప్రీ-మెట్రిక్", "ePASS", "స్టడీ అబ్రాడ్", "పోస్ట్-మెట్రిక్", "ట్యూషన్ ఫీజు", "స్కిల్ అప్‌గ్రేడేషన్"],
      hi: ["छात्रवृत्ति", "शिक्षा", "छात्र", "अंबेडकर", "विदेश अध्ययन", "प्री-मैट्रिक", "ePASS", "विदेश पढ़ाई", "पोस्ट-मैट्रिक", "ट्यूशन फीस", "स्किल अपग्रेडेशन", "परीक्षा शुल्क"],
    },
    responses: {
      en: "📚 Education Schemes on SARTHI (6 schemes)\n\n🌍 Overseas Education:\n1️⃣ Ambedkar Overseas Vidya Nidhi — SC/ST, income ≤ ₹5L, grad ≥ 60%, GRE/GMAT + IELTS/TOEFL, confirmed foreign admission. Up to ₹20L funding.\n2️⃣ CM Minority Overseas Scholarship — Minority community, similar criteria. Up to ₹20L.\n3️⃣ MJP BC Overseas Vidya Nidhi — BC/EBC students, merit-based scoring.\n\n📖 Domestic Scholarships:\n4️⃣ ePASS Pre-Matric — Class 5–10, SC/ST/BC/Minority/Disabled, attendance ≥ 75%, income ≤ ₹2L.\n5️⃣ ePASS Post-Matric — Degree/Diploma students, SC/ST/BC/EBC/Minority/Disabled, income ≤ ₹2L. Covers full tuition + maintenance allowance.\n\n🎓 Skill Development:\n6️⃣ Skill Upgradation (GRE/GMAT/TOEFL/IELTS) — SC/ST/BC/EBC/Minority, income ≤ ₹5L. Full reimbursement of exam fees.\n\nFill your education details in the form to see which you qualify for!",
      te: "📚 SARTHI లో విద్య పథకాలు (6 పథకాలు)\n\n🌍 విదేశీ విద్య:\n1️⃣ అంబేద్కర్ ఓవర్సీస్ విద్యా నిధి — SC/ST, ఆదాయం ≤ ₹5L, పట్టభద్రత ≥ 60%, GRE/GMAT + IELTS/TOEFL, విదేశీ ప్రవేశం. ₹20L వరకు.\n2️⃣ CM మైనారిటీ ఓవర్సీస్ స్కాలర్‌షిప్ — మైనారిటీ సమాజం, సారూప్య ప్రమాణాలు. ₹20L వరకు.\n3️⃣ MJP BC ఓవర్సీస్ విద్యా నిధి — BC/EBC విద్యార్థులు, మెరిట్ ఆధారిత.\n\n📖 స్థానిక స్కాలర్‌షిప్లు:\n4️⃣ ePASS ప్రీ-మెట్రిక్ — తరగతి 5–10, SC/ST/BC/మైనారిటీ/వికలాంగులు, హాజరు ≥ 75%, ఆదాయం ≤ ₹2L.\n5️⃣ ePASS పోస్ట్-మెట్రిక్ — డిగ్రీ/డిప్లొమా విద్యార్థులు, SC/ST/BC/EBC/మైనారిటీ/వికలాంగులు, ఆదాయం ≤ ₹2L. పూర్తి ట్యూషన్ + మెయింటెనెన్స్ అలవెన్స్.\n\n🎓 నైపుణ్య అభివృద్ధి:\n6️⃣ స్కిల్ అప్‌గ్రేడేషన్ (GRE/GMAT/TOEFL/IELTS) — SC/ST/BC/EBC/మైనారిటీ, ఆదాయం ≤ ₹5L. పరీక్షా రుసుముల పూర్తి వాపసు.",
      hi: "📚 SARTHI पर शिक्षा योजनाएँ (6 योजनाएँ)\n\n🌍 विदेश अध्ययन:\n1️⃣ अंबेडकर ओवरसीज विद्या निधि — SC/ST, आय ≤ ₹5L, स्नातक ≥ 60%, GRE/GMAT + IELTS/TOEFL, विदेशी प्रवेश। ₹20L तक।\n2️⃣ CM अल्पसंख्यक ओवरसीज — अल्पसंख्यक समुदाय, समान मानदंड। ₹20L तक।\n3️⃣ MJP BC ओवरसीज विद्या निधि — BC/EBC छात्र, योग्यता आधारित।\n\n📖 घरेलू छात्रवृत्ति:\n4️⃣ ePASS प्री-मैट्रिक — कक्षा 5–10, SC/ST/BC/अल्पसंख्यक/विकलांग, उपस्थिति ≥ 75%, आय ≤ ₹2L।\n5️⃣ ePASS पोस्ट-मैट्रिक — डिग्री/डिप्लोमा छात्र, SC/ST/BC/EBC/अल्पसंख्यक/विकलांग, आय ≤ ₹2L। पूरी ट्यूशन + रखरखाव भत्ता।\n\n🎓 कौशल विकास:\n6️⃣ स्किल अपग्रेडेशन (GRE/GMAT/TOEFL/IELTS) — SC/ST/BC/EBC/अल्पसंख्यक, आय ≤ ₹5L। परीक्षा शुल्क की पूरी प्रतिपूर्ति।",
    },
  },

  // ── ePASS Post-Matric Scholarship ─────────────────────────────────────────
  {
    id: "epass_postmatric",
    patterns: {
      en: ["post-matric", "post matric", "postmatric", "degree scholarship", "diploma scholarship", "tuition reimbursement", "maintenance allowance", "college scholarship", "higher education scholarship"],
      te: ["పోస్ట్-మెట్రిక్", "పోస్ట్ మెట్రిక్", "డిగ్రీ స్కాలర్‌షిప్", "డిప్లొమా స్కాలర్‌షిప్", "ట్యూషన్ వాపసు", "కళాశాల స్కాలర్‌షిప్"],
      hi: ["पोस्ट-मैट्रिक", "पोस्ट मैट्रिक", "डिग्री छात्रवृत्ति", "डिप्लोमा छात्रवृत्ति", "ट्यूशन प्रतिपूर्ति", "रखरखाव भत्ता", "कॉलेज छात्रवृत्ति"],
    },
    responses: {
      en: "📖 ePASS Post-Matric Scholarship\n\nWho qualifies:\n✔ Pursuing Degree, Diploma, or Post-Graduation\n✔ SC / ST / BC / EBC / Minority / Disabled category\n✔ Permanent Telangana resident\n✔ Annual income ≤ ₹2 Lakhs\n✔ Aadhaar linked to bank account\n✔ Has bonafide certificate from institution\n✔ CET allotment letter (if enrolled in a professional course)\n\nBenefits:\n✅ Full tuition fee reimbursement\n✅ Monthly maintenance allowance\n\n💡 Different from Pre-Matric (which covers class 5–10). Post-Matric covers college and university-level courses.",
      te: "📖 ePASS పోస్ట్-మెట్రిక్ స్కాలర్‌షిప్\n\nఎవరు అర్హులు:\n✔ డిగ్రీ, డిప్లొమా లేదా పోస్ట్-గ్రాడ్యుయేషన్ చదువుతున్నవారు\n✔ SC / ST / BC / EBC / మైనారిటీ / వికలాంగ వర్గం\n✔ శాశ్వత తెలంగాణ నివాసి\n✔ వార్షిక ఆదాయం ≤ ₹2 లక్షలు\n✔ ఆధార్ బ్యాంక్ ఖాతాతో లింక్ చేయబడింది\n✔ సంస్థ నుండి బోనాఫైడ్ సర్టిఫికేట్\n✔ వృత్తి విద్యా కోర్సులో చేరినట్లయితే CET కేటాయింపు లెటర్\n\nప్రయోజనాలు:\n✅ పూర్తి ట్యూషన్ ఫీజు వాపసు\n✅ నెలవారీ మెయింటెనెన్స్ అలవెన్స్",
      hi: "📖 ePASS पोस्ट-मैट्रिक छात्रवृत्ति\n\nकौन योग्य है:\n✔ डिग्री, डिप्लोमा या पोस्ट-ग्रेजुएशन में अध्ययनरत\n✔ SC / ST / BC / EBC / अल्पसंख्यक / विकलांग वर्ग\n✔ स्थायी तेलंगाना निवासी\n✔ वार्षिक आय ≤ ₹2 लाख\n✔ आधार बैंक खाते से लिंक\n✔ संस्थान से बोनाफाइड प्रमाणपत्र\n✔ व्यावसायिक पाठ्यक्रम में CET आवंटन पत्र\n\nलाभ:\n✅ पूरी ट्यूशन फीस की प्रतिपूर्ति\n✅ मासिक रखरखाव भत्ता\n\n💡 प्री-मैट्रिक (कक्षा 5–10) से अलग — पोस्ट-मैट्रिक कॉलेज और विश्वविद्यालय स्तर के पाठ्यक्रमों को कवर करता है।",
    },
  },

  // ── Skill Upgradation (GRE/GMAT/TOEFL/IELTS) ─────────────────────────────
  {
    id: "skill_upgradation",
    patterns: {
      en: ["skill upgradation", "exam fee", "gre reimbursement", "gmat reimbursement", "toefl reimbursement", "ielts reimbursement", "exam reimbursement", "test fee refund", "competitive exam fee"],
      te: ["స్కిల్ అప్‌గ్రేడేషన్", "పరీక్ష రుసుము", "GRE వాపసు", "GMAT వాపసు", "TOEFL వాపసు", "IELTS వాపసు", "పరీక్షా రుసుముల వాపసు"],
      hi: ["स्किल अपग्रेडेशन", "परीक्षा शुल्क", "GRE प्रतिपूर्ति", "GMAT प्रतिपूर्ति", "TOEFL प्रतिपूर्ति", "IELTS प्रतिपूर्ति", "परीक्षा शुल्क वापसी"],
    },
    responses: {
      en: "🎓 Skill Upgradation Scheme (GRE / GMAT / TOEFL / IELTS)\n\nWho qualifies:\n✔ SC / ST / BC / EBC / Minority category\n✔ Annual income ≤ ₹5 Lakhs\n✔ Has exam registration receipt\n✔ Has valid test scorecard\n\nBenefit:\n✅ Full reimbursement of GRE / GMAT / TOEFL / IELTS examination fees\n\n💡 This scheme helps SC/ST/BC/EBC/Minority students recover the cost of international competitive exam fees, supporting their path to overseas education.",
      te: "🎓 స్కిల్ అప్‌గ్రేడేషన్ పథకం (GRE / GMAT / TOEFL / IELTS)\n\nఎవరు అర్హులు:\n✔ SC / ST / BC / EBC / మైనారిటీ వర్గం\n✔ వార్షిక ఆదాయం ≤ ₹5 లక్షలు\n✔ పరీక్షా నమోదు రసీదు కలిగి ఉండాలి\n✔ చెల్లుబాటు అయ్యే స్కోర్ కార్డు కలిగి ఉండాలి\n\nప్రయోజనం:\n✅ GRE / GMAT / TOEFL / IELTS పరీక్షా రుసుముల పూర్తి వాపసు\n\n💡 ఈ పథకం SC/ST/BC/EBC/మైనారిటీ విద్యార్థులకు అంతర్జాతీయ పోటీ పరీక్షల ఖర్చులను తిరిగి పొందడంలో సహాయపడుతుంది.",
      hi: "🎓 स्किल अपग्रेडेशन योजना (GRE / GMAT / TOEFL / IELTS)\n\nकौन योग्य है:\n✔ SC / ST / BC / EBC / अल्पसंख्यक वर्ग\n✔ वार्षिक आय ≤ ₹5 लाख\n✔ परीक्षा पंजीकरण रसीद होनी चाहिए\n✔ वैध स्कोरकार्ड होना चाहिए\n\nलाभ:\n✅ GRE / GMAT / TOEFL / IELTS परीक्षा शुल्क की पूरी प्रतिपूर्ति\n\n💡 यह योजना SC/ST/BC/EBC/अल्पसंख्यक छात्रों को अंतर्राष्ट्रीय प्रतियोगी परीक्षाओं की लागत वापस पाने में मदद करती है।",
    },
  },

  // ── All schemes overview ──────────────────────────────────────────────────
  {
    id: "schemes",
    patterns: {
      en: ["schemes", "benefits", "welfare", "what schemes", "list schemes", "available schemes", "government schemes", "programs", "all schemes", "which schemes"],
      te: ["పథకాలు", "ప్రయోజనాలు", "సంక్షేమం", "ఏ పథకాలు", "పథకాల జాబితా", "అందుబాటులో ఉన్న పథకాలు", "ప్రభుత్వ పథకాలు", "అన్ని పథకాలు"],
      hi: ["योजनाएँ", "लाभ", "कल्याण", "कौन सी योजनाएँ", "योजनाओं की सूची", "उपलब्ध योजनाएँ", "सरकारी योजनाएँ", "सभी योजनाएँ"],
    },
    responses: {
      en: "SARTHI checks your eligibility for these 16 Telangana welfare schemes:\n\n🌾 Agriculture\n  • Rythu Bharosa (farmer investment support)\n  • Rythu Bima (₹5L farmer life insurance)\n\n📚 Education (6 schemes)\n  • Ambedkar Overseas Vidya Nidhi (SC/ST, up to ₹20L)\n  • CM Minority Overseas Scholarship (up to ₹20L)\n  • MJP BC Overseas Vidya Nidhi (BC/EBC, merit-based)\n  • ePASS Pre-Matric Scholarship (class 5–10)\n  • ePASS Post-Matric Scholarship (degree/diploma, full tuition)\n  • Skill Upgradation — GRE/GMAT/TOEFL/IELTS fee reimbursement\n\n🏠 Housing & Utilities\n  • Indiramma Housing (₹5L home grant)\n  • Gruha Jyothi (200 free electricity units)\n\n🛡️ Insurance\n  • Rythu Bima (farmers)\n  • Indiramma Family Life Insurance (₹5L cover)\n\n👩 Women & Social Welfare\n  • Mahalakshmi (free bus + ₹2,500/month)\n  • Kalyana Lakshmi (marriage assistance — SC/ST/BC/EBC)\n  • Shaadi Mubarak (marriage assistance — Minority)\n  • Cheyutha / Aasara Pension\n\n💊 Nutrition\n  • Aarogya Lakshmi (Anganwadi meals)\n\nAsk me about any specific scheme for details!",
      te: "SARTHI ఈ 16 తెలంగాణ సంక్షేమ పథకాలకు మీ అర్హతను తనిఖీ చేస్తుంది:\n\n🌾 వ్యవసాయం\n  • రైతు భరోసా (రైతు పెట్టుబడి సహాయం)\n  • రైతు భీమా (₹5L రైతు జీవిత బీమా)\n\n📚 విద్య (6 పథకాలు)\n  • అంబేద్కర్ ఓవర్సీస్ విద్యా నిధి (SC/ST, ₹20L వరకు)\n  • CM మైనారిటీ ఓవర్సీస్ స్కాలర్‌షిప్ (₹20L వరకు)\n  • MJP BC ఓవర్సీస్ విద్యా నిధి (BC/EBC, మెరిట్ ఆధారిత)\n  • ePASS ప్రీ-మెట్రిక్ స్కాలర్‌షిప్ (తరగతి 5–10)\n  • ePASS పోస్ట్-మెట్రిక్ స్కాలర్‌షిప్ (డిగ్రీ/డిప్లొమా, పూర్తి ట్యూషన్)\n  • స్కిల్ అప్‌గ్రేడేషన్ — GRE/GMAT/TOEFL/IELTS ఫీజు వాపసు\n\n🏠 గృహనిర్మాణం & యుటిలిటీలు\n  • ఇందిరమ్మ హౌసింగ్ (₹5L గృహ గ్రాంట్)\n  • గృహ జ్యోతి (200 ఉచిత విద్యుత్ యూనిట్లు)\n\n🛡️ బీమా\n  • రైతు భీమా (రైతులకు)\n  • ఇందిరమ్మ కుటుంబ జీవిత బీమా (₹5L)\n\n👩 మహిళా & సామాజిక సంక్షేమం\n  • మహాలక్ష్మి (ఉచిత బస్సు + నెలకు ₹2,500)\n  • కళ్యాణ లక్ష్మి (వివాహ సహాయం — SC/ST/BC/EBC)\n  • షాది ముబారక్ (వివాహ సహాయం — మైనారిటీ)\n  • చేయూత / ఆసరా పెన్షన్\n\n💊 పోషణ\n  • ఆరోగ్య లక్ష్మి (అంగన్‌వాడి భోజనం)\n\nవివరాల కోసం ఏదైనా నిర్దిష్ట పథకం గురించి అడగండి!",
      hi: "SARTHI इन 16 तेलंगाना कल्याण योजनाओं के लिए आपकी पात्रता जाँचता है:\n\n🌾 कृषि\n  • रैतु भरोसा (किसान निवेश सहायता)\n  • रैतु बीमा (₹5L किसान जीवन बीमा)\n\n📚 शिक्षा (6 योजनाएँ)\n  • अंबेडकर ओवरसीज विद्या निधि (SC/ST, ₹20L तक)\n  • CM अल्पसंख्यक ओवरसीज छात्रवृत्ति (₹20L तक)\n  • MJP BC ओवरसीज विद्या निधि (BC/EBC, योग्यता आधारित)\n  • ePASS प्री-मैट्रिक छात्रवृत्ति (कक्षा 5–10)\n  • ePASS पोस्ट-मैट्रिक छात्रवृत्ति (डिग्री/डिप्लोमा, पूरी ट्यूशन)\n  • स्किल अपग्रेडेशन — GRE/GMAT/TOEFL/IELTS शुल्क प्रतिपूर्ति\n\n🏠 आवास और उपयोगिताएँ\n  • इंदिरम्मा हाउसिंग (₹5L होम ग्रांट)\n  • गृह ज्योति (200 मुफ्त बिजली यूनिट)\n\n🛡️ बीमा\n  • रैतु बीमा (किसानों के लिए)\n  • इंदिरम्मा परिवार जीवन बीमा (₹5L)\n\n👩 महिला और सामाजिक कल्याण\n  • महालक्ष्मी (मुफ्त बस + ₹2,500/माह)\n  • कल्याण लक्ष्मी (विवाह सहायता — SC/ST/BC/EBC)\n  • शादी मुबारक (विवाह सहायता — अल्पसंख्यक)\n  • चेयुथा / आसरा पेंशन\n\n💊 पोषण\n  • आरोग्य लक्ष्मी (आंगनवाड़ी भोजन)\n\nकिसी भी योजना के बारे में विवरण के लिए पूछें!",
    },
  },

  // ── How to check eligibility ──────────────────────────────────────────────
  {
    id: "check_eligibility",
    patterns: {
      en: ["check eligibility", "how do i", "get started", "how to use", "eligibility check", "find schemes", "qualify", "am i eligible", "start", "begin", "fill form", "fill profile"],
      te: ["అర్హత ఎలా తనిఖీ", "ఎలా వాడాలి", "ఎక్కడ మొదలు", "పథకాలు ఎలా వెతకాలి", "అర్హత ఉందా", "ప్రారంభించు", "ఫారం పూరించు", "ప్రొఫైల్ పూరించు"],
      hi: ["पात्रता कैसे जाँचें", "कैसे उपयोग करें", "कहाँ से शुरू करें", "योजनाएँ कैसे खोजें", "क्या मैं पात्र हूँ", "शुरू करें", "फॉर्म भरें", "प्रोफ़ाइल भरें"],
    },
    responses: {
      en: "Here's how to check your eligibility:\n\n1️⃣ Click 'Eligibility Engine' in the nav bar\n2️⃣ Fill personal details — name, age, gender, caste, religion\n3️⃣ Fill socio-economic info — income, residence type, ration card\n4️⃣ Fill education / agriculture / welfare details as applicable\n5️⃣ Click 'Check Eligibility' — the backend engine scores you against all 16 schemes instantly\n\n🎤 Tip: Tap the mic button and speak naturally in your language — e.g. 'My name is Ramesh, 45 years old, income 1.2 lakh, SC, rural' — and the form will auto-fill!",
      te: "మీ అర్హత తనిఖీ చేయడానికి:\n\n1️⃣ నావిగేషన్ బార్‌లో 'అర్హత ఇంజిన్' క్లిక్ చేయండి\n2️⃣ వ్యక్తిగత వివరాలు నింపండి — పేరు, వయసు, లింగం, కులం, మతం\n3️⃣ సామాజిక-ఆర్థిక సమాచారం నింపండి — ఆదాయం, నివాస రకం, రేషన్ కార్డు\n4️⃣ వర్తించే విద్య / వ్యవసాయం / సంక్షేమ వివరాలు నింపండి\n5️⃣ 'అర్హత తనిఖీ చేయండి' క్లిక్ చేయండి — బ్యాకెండ్ ఇంజిన్ మీకు 16 పథకాలకు వెంటనే స్కోర్ ఇస్తుంది\n\n🎤 చిట్కా: మైక్ బటన్ నొక్కి మీ భాషలో సహజంగా మాట్లాడండి — ఉదా. 'నా పేరు రమేష్, 45 సంవత్సరాలు, ఆదాయం 1.2 లక్ష, ఎస్సీ, గ్రామీణ' — ఫారం స్వయంచాలకంగా నింపబడుతుంది!",
      hi: "अपनी पात्रता जाँचने के लिए:\n\n1️⃣ नेविगेशन बार में 'पात्रता इंजन' पर क्लिक करें\n2️⃣ व्यक्तिगत जानकारी भरें — नाम, आयु, लिंग, जाति, धर्म\n3️⃣ सामाजिक-आर्थिक जानकारी भरें — आय, निवास प्रकार, राशन कार्ड\n4️⃣ शिक्षा / कृषि / कल्याण विवरण भरें जैसा लागू हो\n5️⃣ 'पात्रता जाँचें' पर क्लिक करें — बैकएंड इंजन आपको 16 योजनाओं के लिए तुरंत स्कोर करता है\n\n🎤 सुझाव: माइक बटन दबाएं और अपनी भाषा में स्वाभाविक रूप से बोलें — जैसे 'मेरा नाम रमेश है, 45 साल, आय 1.2 लाख, SC, ग्रामीण' — फॉर्म अपने आप भर जाएगा!",
    },
  },

  // ── Voice input help ──────────────────────────────────────────────────────
  {
    id: "voice_help",
    patterns: {
      en: ["voice", "microphone", "speak", "mic", "dictate", "talk", "speech"],
      te: ["వాయిస్", "మైక్రోఫోన్", "మాట్లాడు", "మైక్", "వినండి", "స్పీచ్"],
      hi: ["आवाज़", "माइक्रोफोन", "बोलें", "माइक", "बोलकर", "भाषण", "वॉइस"],
    },
    responses: {
      en: "SARTHI supports voice input in English, Telugu, and Hindi 🎤\n\nHow to use:\n• In the Eligibility Engine, tap the orange mic button\n• Speak naturally, e.g. 'I am Suresh, 55 years old, my income is 90,000, I am BC, I live in a rural area'\n• The AI backend extracts your details and fills the form automatically\n• Review the filled fields before submitting\n\n💡 Switch the language (top-right EN/తె/हि) first so the mic listens in the right language.\n\n⚠️ Works best in Google Chrome or Microsoft Edge.",
      te: "SARTHI తెలుగు, హిందీ మరియు ఆంగ్లంలో వాయిస్ ఇన్‌పుట్‌కు మద్దతు ఇస్తుంది 🎤\n\nఎలా వాడాలి:\n• అర్హత ఇంజిన్‌లో, నారంజ మైక్ బటన్ నొక్కండి\n• సహజంగా మాట్లాడండి, ఉదా. 'నేను సురేష్, 55 సంవత్సరాలు, నా ఆదాయం 90,000, నేను BC, నేను గ్రామీణ ప్రాంతంలో నివసిస్తున్నాను'\n• AI బ్యాకెండ్ మీ వివరాలను వెలికితీసి ఫారంను స్వయంచాలకంగా నింపుతుంది\n• సమర్పించే ముందు నింపిన ఫీల్డ్‌లను సమీక్షించండి\n\n💡 మైక్ సరైన భాషలో వినడానికి ముందు భాష మార్చండి (ఎగువ-కుడి EN/తె/हि).\n\n⚠️ Google Chrome లేదా Microsoft Edge లో బాగా పని చేస్తుంది.",
      hi: "SARTHI हिंदी, तेलुगु और अंग्रेजी में आवाज़ इनपुट का समर्थन करता है 🎤\n\nकैसे उपयोग करें:\n• पात्रता इंजन में, नारंगी माइक बटन दबाएं\n• स्वाभाविक रूप से बोलें, जैसे 'मैं सुरेश हूँ, 55 साल, मेरी आय 90,000 है, मैं BC हूँ, ग्रामीण क्षेत्र में रहता हूँ'\n• AI बैकएंड आपकी जानकारी निकालकर फॉर्म अपने आप भर देता है\n• सबमिट करने से पहले भरे गए फ़ील्ड की जाँच करें\n\n💡 माइक सही भाषा में सुने इसके लिए पहले भाषा बदलें (ऊपर-दाईं EN/తె/हि).\n\n⚠️ Google Chrome या Microsoft Edge में सबसे अच्छा काम करता है।",
    },
  },

  // ── Language switching ────────────────────────────────────────────────────
  {
    id: "language",
    patterns: {
      en: ["change language", "switch language", "telugu", "hindi", "english", "language", "భాష", "भाषा"],
      te: ["భాష మార్చు", "భాష", "తెలుగు", "హిందీ", "ఆంగ్లం", "language"],
      hi: ["भाषा बदलें", "भाषा", "तेलुगु", "हिंदी", "अंग्रेजी", "language"],
    },
    responses: {
      en: "SARTHI supports English, Telugu (తెలుగు), and Hindi (हिन्दी).\n\nTo switch: look for the EN / తె / हि buttons at the top-right of the page. The entire site — including voice recognition and text-to-speech — switches instantly.",
      te: "SARTHI ఆంగ్లం, తెలుగు మరియు హిందీకి మద్దతు ఇస్తుంది.\n\nమార్చడానికి: పేజీ ఎగువ-కుడి వైపున EN / తె / हि బటన్లను చూడండి. వాయిస్ గుర్తింపు మరియు టెక్స్ట్-టు-స్పీచ్‌తో సహా మొత్తం సైట్ వెంటనే మారుతుంది.",
      hi: "SARTHI अंग्रेजी, तेलुगु (తెలుగు) और हिंदी (हिन्दी) का समर्थन करता है।\n\nबदलने के लिए: पृष्ठ के ऊपर-दाईं ओर EN / తె / हि बटन देखें। वॉयस रिकॉग्निशन और टेक्स्ट-टू-स्पीच सहित पूरी साइट तुरंत बदल जाती है।",
    },
  },

  // ── Privacy ───────────────────────────────────────────────────────────────
  {
    id: "privacy",
    patterns: {
      en: ["privacy", "data", "secure", "safe", "aadhaar", "personal information", "who sees", "confidential"],
      te: ["గోప్యత", "డేటా", "సురక్షితం", "ఆధార్", "వ్యక్తిగత సమాచారం", "నా డేటా"],
      hi: ["गोपनीयता", "डेटा", "सुरक्षित", "आधार", "व्यक्तिगत जानकारी", "मेरा डेटा"],
    },
    responses: {
      en: "Your privacy is our priority 🔒\n\n• 256-bit end-to-end encryption\n• Data used ONLY for eligibility computation\n• Follows GoT (Government of Telangana) data protection guidelines\n• Never shared with third parties\n• You can use the eligibility engine without creating an account",
      te: "మీ గోప్యత మా ప్రాధాన్యత 🔒\n\n• 256-బిట్ ఎండ్-టు-ఎండ్ ఎన్‌క్రిప్షన్\n• డేటా అర్హత గణన కోసం మాత్రమే ఉపయోగించబడుతుంది\n• GoT (తెలంగాణ ప్రభుత్వం) డేటా రక్షణ మార్గదర్శకాలను అనుసరిస్తుంది\n• మూడవ పక్షాలతో ఎప్పుడూ పంచుకోబడదు\n• అకౌంట్ సృష్టించకుండా అర్హత ఇంజిన్ ఉపయోగించవచ్చు",
      hi: "आपकी गोपनीयता हमारी प्राथमिकता है 🔒\n\n• 256-बिट एंड-टू-एंड एन्क्रिप्शन\n• डेटा केवल पात्रता गणना के लिए\n• GoT डेटा सुरक्षा दिशानिर्देशों का पालन\n• तृतीय पक्षों के साथ कभी साझा नहीं\n• खाता बनाए बिना पात्रता इंजन उपयोग कर सकते हैं",
    },
  },

  // ── Login / Register ──────────────────────────────────────────────────────
  {
    id: "login_register",
    patterns: {
      en: ["login", "sign in", "register", "account", "create account", "sign up", "password"],
      te: ["లాగిన్", "సైన్ ఇన్", "నమోదు", "అకౌంట్", "అకౌంట్ సృష్టించు", "పాస్‌వర్డ్"],
      hi: ["लॉगिन", "साइन इन", "पंजीकरण", "खाता", "खाता बनाएं", "पासवर्ड"],
    },
    responses: {
      en: "You can check eligibility without an account. Creating a free account lets you:\n✅ Save your profile for future checks\n✅ Track applications in one place\n✅ Get notified when new matching schemes open\n\nClick 'Register' in the navigation bar to create an account, or 'Sign in' if you already have one.",
      te: "మీరు అకౌంట్ లేకుండా అర్హత తనిఖీ చేయవచ్చు. ఉచిత అకౌంట్ సృష్టించడం వలన:\n✅ భవిష్యత్ తనిఖీల కోసం మీ ప్రొఫైల్ సేవ్ చేసుకోవచ్చు\n✅ దరఖాస్తులను ఒకే చోట ట్రాక్ చేయవచ్చు\n✅ కొత్త సరిపోలే పథకాలు తెరిచినప్పుడు నోటిఫికేషన్ పొందవచ్చు\n\nనమోదు చేయడానికి 'నమోదు' క్లిక్ చేయండి.",
      hi: "आप बिना खाते के पात्रता जाँच सकते हैं। मुफ्त खाता बनाने से:\n✅ भविष्य की जाँच के लिए प्रोफ़ाइल सहेजें\n✅ आवेदन एक जगह ट्रैक करें\n✅ नई मिलान योजनाएँ खुलने पर सूचना पाएं\n\nखाता बनाने के लिए 'पंजीकरण' पर क्लिक करें।",
    },
  },

  // ── Fallback ──────────────────────────────────────────────────────────────
  {
    id: "fallback",
    patterns: { en: [], te: [], hi: [] },
    responses: {
      en: "I'm not sure I understood that. I can help you with:\n• All 16 welfare schemes (ask about any by name)\n• Checking your eligibility step-by-step\n• Voice input and language switching\n• Account and privacy questions\n\nWhat would you like to know?",
      te: "నేను అది అర్థం చేసుకోలేదు. నేను వీటిలో సహాయం చేయగలను:\n• అన్ని 16 సంక్షేమ పథకాలు (పేరు పెట్టి ఏదైనా అడగండి)\n• దశలవారీగా అర్హత తనిఖీ\n• వాయిస్ ఇన్‌పుట్ మరియు భాష మార్పు\n• అకౌంట్ మరియు గోప్యత ప్రశ్నలు\n\nమీకు ఏమి తెలుసుకోవాలి?",
      hi: "मुझे यकीन नहीं कि मैंने वह समझा। मैं इनमें मदद कर सकता हूँ:\n• सभी 16 कल्याण योजनाएँ (नाम से कोई भी पूछें)\n• चरण-दर-चरण पात्रता जाँच\n• आवाज़ इनपुट और भाषा बदलना\n• खाता और गोपनीयता प्रश्न\n\nआप क्या जानना चाहते हैं?",
    },
  },
];

/**
 * Finds the best matching intent for a given user message.
 * Returns the fallback intent when nothing matches.
 */
export function matchIntent(message: string, language: Language): Intent {
  const lower = message.toLowerCase();
  for (const intent of INTENTS.slice(0, -1)) {
    const patterns = intent.patterns[language];
    if (patterns.some((p) => lower.includes(p.toLowerCase()))) {
      return intent;
    }
  }
  return INTENTS[INTENTS.length - 1];
}
