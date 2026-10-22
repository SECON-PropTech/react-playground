import RandomFact from "../components/scope312/RandomFact";
import ImportedDataTable from "../components/scope312/ImportedDataTable";
function Scope312({ onSelect }) {
return (
<div>
  <h2>Scope 3.12</h2>
  <h3>Slutbehandling av sålda produkter</h3>
  
  <ImportedDataTable />

  <button
    type="button"
    className="btn btn-info"
    onClick={() => onSelect("materials")}
  >
    Visa materialkategorier
  </button>

  <button
    type="button"
    className="btn btn-info ms-2"
    onClick={() => onSelect("topTen")}
  >
    Visa top 10 största avfall
  </button>

  <RandomFact />
</div>

);
}

export default Scope312;