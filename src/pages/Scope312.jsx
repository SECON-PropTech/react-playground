import PieChart from "../components/scope312/MyPieChart";
import MyTable from "../components/scope312/MyTable";
import RandomFact from "../components/scope312/RandomFact";
import { getMaterialTotals } from "../utils/materialCalculations";

function Scope312({ onSelectMaterial, onSelect }) {
  const totals = getMaterialTotals();

  const chartData = Object.entries(totals).map(
    ([name, value]) => ({
      name,
      value,
    })
  );
  return (
    <div>
      <h2>Scope 3.12</h2>
      <h3>Slutbehandling av sålda produkter</h3>
      <div className="container text-center">
        <div className="row row-cols-2">
          <div className="col">
            <MyTable onSelectMaterial={onSelectMaterial}/>
          </div>
          <div className="col">
            <PieChart data={chartData} unit="kg" />
            <button
              type="button"
              className="btn btn-info"
              onClick={() => onSelect("topTen")}
            >
              Visa top 10 största avfall
            </button>
          </div>
        </div>
      </div>
      <RandomFact/>
    </div>
  );
}

export default Scope312;