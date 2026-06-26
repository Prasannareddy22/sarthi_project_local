import { getSchemeById } from '../../services/schemeService';
import { useParams, Link } from '@tanstack/react-router'; 

const SchemeDetail = () => {
  
  const { id } = useParams({ from: '/scheme/$id' });
  const scheme = getSchemeById(id || '');

  if (!scheme) return <div>Scheme not found!</div>;

  return (
    <div className="scheme-detail-container">
      {/* 3. Use TanStack Router Link */}
      <Link to="/">← Back to Dashboard</Link>
      
      <h1>{scheme.name}</h1>
      <span className="category-badge">{scheme.category}</span>
      
      <p>{scheme.description}</p>

      <h3>Benefits</h3>
      <ul>
        {scheme.benefits.map((benefit, i) => <li key={i}>{benefit}</li>)}
      </ul>

      <h3>Required Documents</h3>
      <ul>
        {scheme.documents.map((doc, i) => <li key={i}>{doc}</li>)}
      </ul>

      <h3>How to Apply</h3>
      <p>{scheme.offlineInstructions}</p>

      {scheme.onlineLink && (
        <a href={scheme.onlineLink} target="_blank" rel="noopener noreferrer">
          Visit Official Website
        </a>
      )}
    </div>
  );
};

export default SchemeDetail;