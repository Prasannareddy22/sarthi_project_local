import { getSchemeById } from '../../services/schemeService';
import { useParams, Link } from '@tanstack/react-router'; 

const SchemeDetail = () => {
  const { id } = useParams({ from: '/scheme/$id' });
  const scheme = getSchemeById(id || '');

  if (!scheme) return <div className="p-10 text-center">Scheme not found!</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 md:p-12 bg-white min-h-screen">
      {/* Navigation */}
      <Link 
        to="/" 
        search={{ tab: 'schemes' }} 
        className="text-blue-600 hover:text-blue-800 font-medium mb-8 inline-block"
      >
        &larr; Back to Schemes
      </Link>
      
      {/* Header Section */}
      <div className="mb-8">
        <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm font-semibold rounded-full mb-3">
          {scheme.category}
        </span>
        <h1 className="text-4xl font-extrabold text-slate-900 mb-4">{scheme.name}</h1>
        <p className="text-lg text-slate-600 leading-relaxed">{scheme.description}</p>
      </div>
      
      {/* Content Grid */}
      <div className="grid md:grid-cols-2 gap-8 mb-10">
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
          <h3 className="text-xl font-bold text-slate-900 mb-4">Key Benefits</h3>
          <ul className="space-y-2">
            {scheme.benefits.map((benefit, i) => (
              <li key={i} className="flex items-start text-slate-700">
                <span className="mr-2 text-blue-600">✓</span> {benefit}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
          <h3 className="text-xl font-bold text-slate-900 mb-4">Required Documents</h3>
          <ul className="space-y-2">
            {scheme.documents.map((doc, i) => (
              <li key={i} className="text-slate-700 list-disc list-inside">{doc}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Application Instructions */}
      <div className="mb-10 p-6 border-l-4 border-blue-600 bg-blue-50">
        <h3 className="text-xl font-bold text-blue-900 mb-2">How to Apply</h3>
        <p className="text-blue-800">{scheme.offlineInstructions}</p>
      </div>

      {/* CTA Button */}
      {scheme.onlineLink && (
        <a 
          href={scheme.onlineLink} 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-block w-full md:w-auto px-8 py-4 bg-[#0B2240] text-white font-bold rounded-xl hover:bg-blue-900 transition-all text-center shadow-lg"
        >
          Visit Official Website to Apply
        </a>
      )}
    </div>
  );
};

export default SchemeDetail;