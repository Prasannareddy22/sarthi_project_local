import React, { useState } from 'react';
import { getAllSchemes } from '../../services/schemeService';
import SchemeCard from './SchemeCard';
import { Scheme } from '@/data/schemes';
import EligibleCard from '../EligibleCard';

const SchemeList: React.FC = () => {
  const [schemes] = useState<Scheme[]>(getAllSchemes());
  const [search, setSearch] = useState("");

  const filteredSchemes = schemes.filter(s => 
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="scheme-list-container">
      <h2>Available Schemes</h2>
      
      <input 
        placeholder="Filter schemes..." 
        value={search}
        onChange={(e) => setSearch(e.target.value)} 
        className="mb-6 p-2 border rounded w-full max-w-sm"
      />

      <div 
        className="scheme-grid" 
        style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '20px' 
        }}
      >
        {filteredSchemes.length > 0 ? (
          filteredSchemes.map((scheme) => (
            <EligibleCard key={scheme.id} scheme={scheme} />
          ))
        ) : (
          <p className="col-span-full text-center py-10 text-[#64748B]">
            No schemes found.
          </p>
        )}
      </div>
    </div>
  );
};

export default SchemeList;