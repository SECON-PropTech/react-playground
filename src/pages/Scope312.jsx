import RandomFact from "../components/scope312/RandomFact";

function Scope312({ onSelect }) {
return (
<div>
<h2>Scope 3.12</h2>
<h3>Slutbehandling av sålda produkter</h3>
<table className="table">
  <thead>
    <tr>
      <th scope="col" className="product-column"></th>
      <th scope="col">Avfall</th>
      <th scope="col">Vikt per produkt</th>
      <th scope="col">Antal</th>
      <th scope="col">Uppdrag</th>
      <th scope="col">Hantering</th>
      <th scope="col">Livslängd</th>
    </tr>
  </thead>
  <tbody>
  </tbody>
</table>

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