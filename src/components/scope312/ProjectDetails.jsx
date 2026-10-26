import { getAllProducts } from "../../utils/materialCalculations";

function ProjectDetails({ projectName, onBack }) {
  // Den här funktionen aktiveras av Projects button och använder "project" som props.
  // anänver sig av funktionen getAllProducts från utils och returnerar en sida med projektdetaljer
  const products = getAllProducts();

  const projectProducts = products.filter((product) =>
    product.projects?.includes(projectName)
  );

  return (
    <div className="container">
      <button
        type="button"
        className="btn btn-secondary mb-3"
        onClick={onBack}
      >
        ← Tillbaka till projekt
      </button>

      <h2>{projectName}</h2>

      <h3>Material som används</h3>

      {projectProducts.length > 0 ? (
        <ul className="list-group">
          {projectProducts.map((product) => (
            <li key={product.id} className="list-group-item">
              <strong>{product.name}</strong>
              <p className="mb-1">
                Antal: {product.quantity}
              </p>
              <p className="mb-0">
                Avfallshantering: {product["waste-managing"]}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Inga produkter hittades för projektet.</p>
      )}
    </div>
  );
}

export default ProjectDetails;