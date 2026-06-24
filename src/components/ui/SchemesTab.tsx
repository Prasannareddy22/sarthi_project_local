import React from 'react';
import { 
  Building2, 
  Tractor, 
  GraduationCap, 
  Shield, 
  HeartPulse, 
  Apple, 
  Wallet 
} from 'lucide-react';

// Define the structure for a Scheme
export type Scheme = {
  id: string;
  name: string;
  scheme?: string;
  category: "Agriculture" | "Education" | "Welfare" | "Housing" | "Pension" | "Nutrition"; 
  description: string;
  benefitSummary: string;
  percentage?: number; 
  missing?: string[];
};

const schemesData: Scheme[] = [
  // --- WELFARE ---
  { id: "maha-lakshmi", name: "Maha Lakshmi Scheme", category: "Welfare", description: "Financial aid, LPG subsidies, and free bus travel for eligible women.", benefitSummary: "₹2,500/mo, ₹500 LPG, Free TSRTC bus travel" },
  { id: "kalyana-lakshmi", name: "Kalyana Lakshmi Scheme", category: "Welfare", description: "One-time financial assistance for marriage for SC/ST/BC/EBC girls.", benefitSummary: "₹1,00,116 (₹1,25,145 for disabled)" },
  { id: "shaadi-mubarak", name: "Shaadi Mubarak Scheme", category: "Welfare", description: "One-time financial assistance for marriage for minority community girls.", benefitSummary: "₹1,00,116 (₹1,25,145 for disabled)" },
  { id: "gruha-jyothi", name: "Gruha Jyothi Scheme", category: "Welfare", description: "Free electricity up to 200 units per month for domestic households.", benefitSummary: "Zero bill for up to 200 units" },
  { id: "aarogya-lakshmi", name: "Aarogya Lakshmi Scheme", category: "Nutrition", description: "Nutritious meals, eggs, and milk for pregnant/lactating women and children at Anganwadis.", benefitSummary: "Daily meal, eggs, and milk supply" },
  { id: "indiramma-life-insurance", name: "Indiramma Family Life Insurance", category: "Welfare", description: "Universal life insurance cover for families in case of the death of the earning member.", benefitSummary: "₹5 Lakh insurance cover" },

  // --- HOUSING & PENSION ---
  { id: "indiramma-housing", name: "Indiramma Housing Scheme", category: "Housing", description: "Financial assistance for house construction for homeless families.", benefitSummary: "Up to ₹5 Lakh assistance" },
  { id: "cheyutha", name: "Cheyutha Scheme", category: "Pension", description: "Monthly pension for elderly, widows, disabled, and specific workers.", benefitSummary: "₹4,000/mo (₹6,000 for disabled)" },

  // --- AGRICULTURE ---
  { id: "rythu-bharosa", name: "Rythu Bharosa", category: "Agriculture", description: "Annual financial assistance for landowners to support cultivation costs.", benefitSummary: "₹12,000 per acre/year" },
  { id: "rythu-bhima", name: "Rythu Bhima", category: "Agriculture", description: "Life insurance cover for farmers with premiums paid by the government.", benefitSummary: "₹5 Lakh insurance to nominee" },

  // --- EDUCATION ---
  { id: "ambedkar-overseas", name: "Ambedkar Overseas Vidya Nidhi", category: "Education", description: "Financial assistance for SC/ST students pursuing higher studies abroad.", benefitSummary: "Up to ₹20 Lakh assistance" },
  { id: "cm-overseas-minority", name: "CM Overseas Scholarship (Minority)", category: "Education", description: "Financial assistance for minority students for foreign education.", benefitSummary: "Up to ₹20 Lakh assistance" },
  { id: "bc-overseas-vidya-nidhi", name: "Mahatma Jyothiba Phule BC Overseas", category: "Education", description: "Financial assistance for BC/EBC students for PG and PhD studies abroad.", benefitSummary: "Up to ₹20 Lakh assistance" },
  { id: "epass-pre-matric", name: "ePASS Pre-Matric Scholarship", category: "Education", description: "Financial assistance for school-level education, including books and uniforms.", benefitSummary: "Direct DBT for school expenses" },
  { id: "epass-post-matric", name: "ePASS Post-Matric Scholarship", category: "Education", description: "Tuition fee reimbursement and maintenance fees for higher studies.", benefitSummary: "Tuition reimbursement & monthly allowance" }
];

const getIcon = (category: string) => {
  switch (category) {
    case "Agriculture": return <Tractor className="w-5 h-5" />;
    case "Education": return <GraduationCap className="w-5 h-5" />;
    case "Housing": return <Building2 className="w-5 h-5" />;
    case "Welfare": return <HeartPulse className="w-5 h-5" />;
    case "Nutrition": return <Apple className="w-5 h-5" />;
    case "Pension": return <Wallet className="w-5 h-5" />;
    default: return <Shield className="w-5 h-5" />;
  }
};

export const SchemesTab = () => {

  return (
    <div className="max-w-6xl mx-auto py-12 px-6">
      <div className="mb-10">
        <h2 className="text-[32px] font-extrabold text-[#0B2240] tracking-tight">
          Available Schemes
        </h2>
        <div className="mt-2 h-1 w-12 bg-[#0B2240] rounded-full" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* 3. Map directly over schemesData */}
        {schemesData.map((s) => (
          <div 
            key={s.id} 
            className="group flex flex-col bg-white p-5 rounded-xl border border-slate-300 
                       hover:border-[#0B2240] hover:shadow-[0_8px_20px_-5px_rgba(11,34,64,0.25)] 
                       transition-all duration-300 ease-in-out"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-9 h-9 rounded-lg bg-[#F1F5F9] flex items-center justify-center text-[#0B2240] group-hover:bg-[#0B2240] group-hover:text-white transition-colors duration-300">
                {getIcon(s.category)}
              </div>
              <span className="text-[9px] font-bold text-[#64748B] uppercase tracking-widest bg-slate-100 px-2 py-1 rounded">
                {s.category}
              </span>
            </div>
            
            <h4 className="font-bold text-[#0B2240] mb-2 text-base leading-tight group-hover:text-[#1E3A8A]">
              {s.name}
            </h4>
            <p className="text-[12px] text-[#64748B] leading-relaxed mb-4 flex-grow line-clamp-2">
              {s.description}
            </p>
            
            <div className="bg-[#F8FAFC] p-3 rounded-lg mb-4 border border-slate-100 group-hover:border-blue-100 transition-colors">
              <p className="text-[9px] font-black uppercase text-[#94A3B8] tracking-widest mb-0.5">Benefit</p>
              <p className="text-[12px] font-semibold text-[#0B2240]">{s.benefitSummary}</p>
            </div>
            
            <button className="w-full py-2.5 bg-white border border-[#0B2240] text-[#0B2240] text-[11px] font-bold uppercase tracking-widest rounded-lg 
                               hover:bg-[#0B2240] hover:text-white hover:shadow-md transition-all duration-300">
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};