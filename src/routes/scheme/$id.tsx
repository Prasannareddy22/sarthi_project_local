import React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { getSchemeById } from '../../services/schemeService'; 

// 1. Define the Route
export const Route = createFileRoute('/scheme/$id')({
  component: SchemeDetail,
});

function SchemeDetail() {
  // 2. Use the Route object's type-safe useParams hook
  const { id } = Route.useParams();
  
  // 3. Fetch the specific data
  const scheme = getSchemeById(id);

  if (!scheme) {
    return (
      <div className="p-10 text-center">
        <h2 className="text-xl font-bold">Scheme not found!</h2>
        <p>The scheme you are looking for does not exist.</p>
      </div>
    );
  }

  // 4. Render the details
  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">{scheme.name}</h1>
      <p className="text-lg text-gray-700 mb-6">{scheme.description}</p>
      
      <div className="bg-blue-50 p-6 rounded-xl">
        <h2 className="text-xl font-semibold mb-2">Key Benefits</h2>
        <ul className="list-disc ml-5 space-y-2">
          {scheme.benefits.map((b: string, i: number) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
      </div>
      
      <div className="mt-8">
        <button className="px-6 py-3 bg-[#0B2240] text-white rounded-lg hover:bg-[#1E3A8A] transition-colors">
          Apply Now
        </button>
      </div>
    </div>
  );
}

export default SchemeDetail;