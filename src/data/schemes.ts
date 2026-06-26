export interface Scheme {
  id: string;
  name: string;
  category: string;
  requiresMeeSeva: boolean;
  description: string;
  benefits: string[];
  documents: string[];
  onlineLink?: string;
  offlineInstructions: string;
}

export const schemes: Scheme[] = [
  {
    id: "maha-lakshmi",
    name: "Maha Lakshmi Scheme",
    category: "Women & Child Welfare",
    requiresMeeSeva: true,
    description: "A flagship initiative providing monthly financial assistance, subsidized LPG, and free transport to eligible women in Telangana[cite: 1, 2].",
    benefits: [
      "₹2,500 monthly financial assistance for heads of families[cite: 1, 2]",
      "One LPG cylinder per month at a subsidized rate of ₹500[cite: 1, 2]",
      "Unlimited free travel in TSRTC buses across the state for women, girls, and transgenders[cite: 1, 2]"
    ],
    documents: [
      "[Aadhaar Redacted] (or valid photo ID with address proof)[cite: 1, 2]",
      "Bank account details (linked with [Aadhaar Redacted] for DBT)[cite: 1, 2]",
      "Ration Card (for LPG subsidy)[cite: 1, 2]"
    ],
    onlineLink: "https://mahalakshmi.telangana.gov.in/",
    offlineInstructions: "For registration or Smart Card issues, visit your nearest Mee Seva center with your required documents[cite: 1, 2]."
  }, 
  {
    id: "kalyana-lakshmi",
    name: "Kalyana Lakshmi Scheme",
    category: "Women & Child Welfare",
    requiresMeeSeva: true,
    description: "One-time financial assistance provided to eligible girls at the time of marriage to support families[cite: 1, 2].",
    benefits: [
      "₹1,00,116 standard financial assistance[cite: 1, 2]",
      "₹1,25,145 for disabled girls[cite: 1, 2]"
    ],
    documents: [
      "[Aadhaar Redacted][cite: 1, 2]",
      "Marriage Certificate[cite: 1, 2]",
      "Caste Certificate[cite: 1, 2]",
      "Income Certificate[cite: 1, 2]",
      "Bank Passbook[cite: 1, 2]"
    ],
    onlineLink: "https://telanganaepass.cgg.gov.in/",
    offlineInstructions: "Apply via Mee Seva or the local Tahsildar office[cite: 1, 2]."
    },
    {
    id: "shaadi-mubarak",
    name: "Shaadi Mubarak Scheme",
    category: "Women & Child Welfare",
    requiresMeeSeva: true,
    description: "Financial assistance provided to girls from minority communities at the time of marriage to support families.",
    benefits: [
        "₹1,00,116 standard financial assistance[cite: 1, 2]",
        "₹1,25,145 for disabled girls[cite: 1, 2]"
    ],
    documents: [
        "[Aadhaar Redacted][cite: 1, 2]",
        "Marriage Certificate[cite: 1, 2]",
        "Caste Certificate[cite: 1, 2]",
        "Income Certificate[cite: 1, 2]",
        "Bank Passbook[cite: 1, 2]"
    ],
    onlineLink: "https://telanganaepass.cgg.gov.in/",
    offlineInstructions: "Apply via Mee Seva or the local Tahsildar office[cite: 1, 2]."
    },
    {
    id: "gruha-jyothi",
    name: "Gruha Jyothi Scheme",
    category: "Utilities",
    requiresMeeSeva: false,
    description: "Provides free electricity up to 200 units per month for eligible domestic households in Telangana.",
    benefits: [
        "Zero electricity bill for consumption up to 200 units per month",
        "Subsidy provided on a continuous monthly basis[cite: 1, 2]"
    ],
    documents: [
        "Valid domestic electricity connection[cite: 1, 2]",
        "[Aadhaar Redacted] (linked with ration card and electricity connection)[cite: 1, 2]",
        "White Ration Card (Food Security Card)[cite: 1, 2]"
    ],
    offlineInstructions: "The scheme is linked to electricity service connections; ensure [Aadhaar Redacted] and ration card details are updated with your electricity provider[cite: 1, 2]."
    },
    {
    id: "indiramma-housing",
    name: "Indiramma Housing Scheme",
    category: "Housing",
    requiresMeeSeva: true,
    description: "Financial assistance provided for house construction to eligible homeless and landless families.",
    benefits: [
        "Financial assistance of up to ₹5 Lakh for house construction",
        "Free plot or land provided to landless and homeless families[cite: 1, 2]",
        "Support for incomplete houses (₹3 Lakh for foundation stage, ₹2 Lakh for slab stage)[cite: 1, 2]"
    ],
    documents: [
        "White Ration Card (Food Security Card)[cite: 1, 2]",
        "[Aadhaar Redacted][cite: 1, 2]"
    ],
    offlineInstructions: "Beneficiaries are selected based on government-verified L1/L2 lists; inquire at your local MRO or housing office for status[cite: 1, 2]."
    },
    {
    id: "cheyutha",
    name: "Cheyutha Scheme",
    category: "Social Welfare",
    requiresMeeSeva: true,
    description: "Provides monthly pensions to senior citizens, widows, and other vulnerable groups, integrated with health coverage.",
    benefits: [
        "₹4,000 monthly pension for most eligible categories",
        "₹6,000 monthly pension for Persons with Disabilities (Divyang)[cite: 1]",
        "Aarogya Sri integration providing up to ₹10 Lakh free medical treatment per family per year[cite: 1]"
    ],
    documents: [
        "[Aadhaar Redacted] (linked with bank account)[cite: 1]",
        "Income Certificate[cite: 1]",
        "Caste/Disability Certificate[cite: 1]"
    ],
    offlineInstructions: "Submit your application at the local MRO office or your nearest Mee Seva center for processing[cite: 1]."
    },
    {
    id: "aarogya-lakshmi",
    name: "Aarogya Lakshmi Scheme",
    category: "Nutrition",
    requiresMeeSeva: false,
    description: "Provides nutritious meals and health monitoring for pregnant women, lactating mothers, and children at Anganwadi Centres.",
    benefits: [
        "One full nutritious meal daily for 25 days a month for pregnant and lactating women",
        "Daily supply of milk and eggs[cite: 1]",
        "Regular supply of Iron & Folic Acid (IFA) tablets[cite: 1]",
        "Nutritional support for children aged 7 months to 6 years[cite: 1]"
    ],
    documents: [
        "Registration at local Anganwadi Centre[cite: 1]"
    ],
    offlineInstructions: "Visit your nearest Anganwadi Centre to register; no formal application portal is required for initial enrollment[cite: 1]."
    },
    {
    id: "indiramma-life-insurance",
    name: "Indiramma Life Insurance Scheme",
    category: "Insurance",
    requiresMeeSeva: false,
    description: "A social security initiative providing life insurance coverage to eligible low-income families in Telangana to ensure financial stability in the event of the primary breadwinner's passing.",
    benefits: [
        "Insurance coverage in the event of accidental death or natural death",
        "Direct financial support to the nominated legal heir"
    ],
    documents: [
        "White Ration Card (Food Security Card)",
        "[Aadhaar Redacted] of the applicant and the nominee",
        "Death certificate (for claim processing)"
    ],
    offlineInstructions: "Enrollment is often facilitated through the Gram Panchayat or local municipal office; check with your local authority for specific registration windows."
    },
    {
    id: "rythu-bharosa",
    name: "Rythu Bharosa Scheme",
    category: "Agriculture",
    requiresMeeSeva: false,
    description: "Provides financial investment support to farmers for two crops per year to ensure agricultural sustainability and household income.",
    benefits: [
        "Financial investment support of ₹7,500 per acre per year",
        "Direct Benefit Transfer (DBT) credited directly to farmers' bank accounts"
    ],
    documents: [
        "Pattadar Passbook (Land ownership records)",
        "[Aadhaar Redacted] (linked to land records)",
        "Bank account details"
    ],
    onlineLink: "https://rythubharosa.telangana.gov.in/",
    offlineInstructions: "Land record verification is processed via the Agriculture Department; visit the local Agriculture Extension Officer (AEO) for enrollment assistance."
    },
    {
    id: "rythu-bhima",
    name: "Rythu Bhima Scheme",
    category: "Insurance",
    requiresMeeSeva: false,
    description: "A farmer's group life insurance scheme providing financial relief and social security to the families of farmers in the event of their death.",
    benefits: [
        "₹5 Lakh insurance coverage in case of death of the farmer due to any cause",
        "Fast-track claim settlement process for the nominee"
    ],
    documents: [
        "Pattadar Passbook",
        "[Aadhaar Redacted] of the farmer and the nominee",
        "Death Certificate (for claim processing)"
    ],
    offlineInstructions: "Enrollment is typically handled through the Agriculture Department and the Life Insurance Corporation (LIC); contact your local Agriculture Extension Officer (AEO) for enrollment details."
    },
    {
    id: "ambedkar-overseas-vidya-nidhi",
    name: "Ambedkar Overseas Vidya Nidhi",
    category: "Education",
    requiresMeeSeva: true,
    description: "A scholarship scheme providing financial assistance to eligible students from SC, ST, and minority communities for pursuing higher education (Post-Graduation) abroad.",
    benefits: [
        "Financial assistance of up to ₹20 Lakhs for tuition and living expenses",
        "One-way economy class airfare ticket",
        "Visa fee reimbursement"
    ],
    documents: [
        "Degree Certificate/Provisional Certificate",
        "GRE/GMAT/IELTS/TOEFL scorecards",
        "Admission offer letter from a foreign university",
        "[Aadhaar Redacted]",
        "Income Certificate"
    ],
    onlineLink: "https://epass.cgg.gov.in/",
    offlineInstructions: "Applications are processed through the ePass portal; however, document verification may be required at the local District Social Welfare Office."
    },
    {
    id: "cm-overseas-scholarship-minorities",
    name: "Chief Minister's Overseas Scholarship Scheme for Minorities",
    category: "Education",
    requiresMeeSeva: true,
    description: "A financial assistance program for meritorious students from minority communities to pursue Post-Graduate and PhD programs at universities abroad.",
    benefits: [
        "Financial support of up to ₹20 Lakhs for tuition and living expenses",
        "Reimbursement of visa fees",
        "One-way economy class airfare"
    ],
    documents: [
        "Post-graduate degree certificate",
        "GRE/GMAT/IELTS/TOEFL scores",
        "University admission offer letter",
        "[Aadhaar Redacted]",
        "Income certificate"
    ],
    onlineLink: "https://telanganaepass.cgg.gov.in/",
    offlineInstructions: "Applications are filed via the ePass portal; verification of original documents is conducted by the Minority Welfare Department."
    },
    {
    id: "jyothiba-phule-bc-overseas",
    name: "Mahatma Jyothiba Phule BC Overseas Vidya Nidhi",
    category: "Education",
    requiresMeeSeva: true,
    description: "A scholarship scheme providing financial assistance to eligible students from Backward Classes (BC) to pursue Post-Graduation and PhD programs in universities abroad.",
    benefits: [
        "Financial assistance of up to ₹20 Lakhs for tuition and living expenses",
        "Reimbursement of visa fees",
        "One-way economy class airfare ticket"
    ],
    documents: [
        "Degree Certificate/Provisional Certificate",
        "GRE/GMAT/IELTS/TOEFL scorecards",
        "Admission offer letter from a foreign university",
        "[Aadhaar Redacted]",
        "Income Certificate"
    ],
    onlineLink: "https://telanganaepass.cgg.gov.in/",
    offlineInstructions: "Applications are processed through the ePass portal; original document verification is conducted by the BC Welfare Department."
    },
    {
    id: "skill-upgradation-tests",
    name: "Skill Upgradation (GRE, GMAT, TOEFL, IELTS)",
    category: "Education",
    requiresMeeSeva: false,
    description: "Financial support provided to students from eligible social categories to cover the high costs of registration and examination fees for international proficiency and entrance exams.",
    benefits: [
        "Full reimbursement of examination registration fees for GRE/GMAT/TOEFL/IELTS",
        "Support for standardized test preparation resources"
    ],
    documents: [
        "Valid student ID",
        "Receipts of examination fee payments",
        "Scorecards (once available)",
        "[Aadhaar Redacted]",
        "Caste/Income Certificate"
    ],
    onlineLink: "https://telanganaepass.cgg.gov.in/",
    offlineInstructions: "Submit original payment receipts and scorecards to the respective District Welfare Office or via the ePass portal after appearing for the exam."
    },
        {
    id: "telangana-epass-pre-matric",
    name: "Telangana ePASS Pre-Matric Scholarship",
    category: "Education",
    requiresMeeSeva: true,
    description: "Financial assistance provided to students from eligible SC, ST, BC, and minority communities studying in classes 9 and 10 to encourage school retention and reduce dropout rates.",
    benefits: [
        "Annual scholarship amount to cover educational expenses",
        "Support for books and academic supplies"
    ],
    documents: [
        "[Aadhaar Redacted] of the student",
        "Caste Certificate (issued via MeeSeva)",
        "Income Certificate (issued via MeeSeva)",
        "Bonafide Certificate from the school",
        "Bank account details (Aadhaar-seeded)"
    ],
    onlineLink: "https://telanganaepass.cgg.gov.in/",
    offlineInstructions: "Applications are processed through the ePass portal; verification is conducted by the school headmaster and the respective District Welfare Officer."
    },
    {
    id: "telangana-epass-post-matric",
    name: "Telangana ePASS Post-Matric Scholarship",
    category: "Education",
    requiresMeeSeva: true,
    description: "A comprehensive scholarship program providing tuition fee reimbursement and maintenance allowances to eligible SC, ST, BC, EBC, and Minority students pursuing post-matriculation courses in Telangana.",
    benefits: [
        "Full tuition fee reimbursement for professional and non-professional courses (as per government norms)",
        "Monthly maintenance allowance provided to eligible hostellers and day scholars"
    ],
    documents: [
        "[Aadhaar Redacted] (linked with bank account and SSC certificate)",
        "Caste Certificate (issued via MeeSeva)",
        "Income Certificate (issued via MeeSeva)",
        "SSC/10th Class Marks Memo",
        "Bonafide Certificate (covering the last 7 years of study)",
        "CET Allotment Order (for professional courses)",
        "Bank Passbook (Nationalized bank, Aadhaar-seeded)"
    ],
    onlineLink: "https://telanganaepass.cgg.gov.in/",
    offlineInstructions: "After online submission, undergo mandatory biometric authentication at a MeeSeva center and submit hard copies of documents to your college's scholarship section."
    }
];