import React from 'react';
import { Link } from '@tanstack/react-router';
import { Scheme } from '@/data/schemes';

interface SchemeCardProps {
  scheme: Scheme;
}

const SchemeCard: React.FC<SchemeCardProps> = ({ scheme }) => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-sm hover:shadow-md transition-shadow">
      <h3 className="text-lg font-bold text-[#0B2240] mb-3">{scheme.name}</h3>
      <p className="text-[#64748B] text-sm mb-4 line-clamp-2">{scheme.description}</p>
      
      <div className="benefits mb-6">
        <strong className="text-xs uppercase tracking-wider text-[#94A3B8]">Benefits:</strong>
        <ul className="mt-2 text-sm text-[#334155] space-y-1">
          {scheme.benefits.slice(0, 2).map((benefit: string, index: number) => (
            <li key={index} className="flex items-center">
              <span className="mr-2">•</span> {benefit}
            </li>
          ))}
        </ul>
      </div>

      <Link 
        to="/scheme/$id" 
        params={{ id: scheme.id }}
        className="block w-full text-center px-4 py-2 bg-[#0B2240] text-white rounded-lg hover:bg-[#1E3A8A] transition-colors"
      >
        View Details
      </Link>
    </div>
  );
};

export default SchemeCard;