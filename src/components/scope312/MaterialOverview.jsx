import PieChart from "./MyPieChart";
import MyTable from "./MaterialTable";
import { getMaterialTotals } from "../../utils/materialCalculations";

function MaterialOverview({ onSelectMaterial, onBack }) {
const totals = getMaterialTotals();

const chartData = Object.entries(totals).map(([name, value]) => ({
name,
value,
}));

return (
<div>
<button
    type="button"
    className="btn btn-outline-secondary mb-3"
    onClick={onBack}
>
    ← Tillbaka
</button>
<h2>Materialkategorier</h2>

  <div className="container text-center">
    <div className="row row-cols-1 row-cols-md-2">
      <div className="col">
        <MyTable onSelectMaterial={onSelectMaterial} />
      </div>

      <div className="col">
        <PieChart data={chartData} unit="kg" />
      </div>
    </div>
  </div>
</div>

);
}

export default MaterialOverview;