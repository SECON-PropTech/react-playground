import { useState } from "react";

//calculations and formattiong from utils/
import { getProductData, getProductKpis } from "../utils/productCalculations";
import { formatNumber, formatPercent } from "../utils/format"

//components
import ProductTable from "../components/scope311/ProductTable"
import KpiCard from "../components/scope311/kpicard";
import ConsumptionBar from "../components/scope311/ConsumptionBar";


function Scope311() {
  //all calculated values for the table and the bar
  const productData = getProductData();
  //the values for the KPI cards
  const kpis = getProductKpis()

  return (
    <div>
      <p>Produktrapport</p>
      <h1>Energiförbrukning per produkt</h1>
      <p>En översikt över sålda produkter och hur mycket energi de förbrukar under sin livslängd.</p>

      <ProductTable
        rows={productData.rows}
        total={productData.total}
        unit={productData.unit}/>

    
      <div className="row">
        <div className="col-md-4">
          <KpiCard
            title={kpis.highestName}
            value={kpis.highestTimesLowest + "x"}
            text={"mer energi per år än en " + kpis.lowestName}
            highlighted={true}/>
        </div>

        <div className="col-md-4">
          <KpiCard
            title={kpis.lifetimeName}
            value={formatNumber(kpis.lifetimeUse) + " " + productData.unit}
            text={"drar en enda enhet under sina " + kpis.lifetimeYears + " år"}
            highlighted={true}/>
        </div>

        <div className="col-md-4">
          <KpiCard
            title={kpis.lowestName}
            value={formatPercent(kpis.lowestShare) + "%"}
            text={"av förbrukningen, trots att den är nummer " + kpis.lowestSalesRank + " i antal sålda"}
            highlighted={false}/>
        </div>
      </div>  

      <ConsumptionBar
        rows={productData.rows}
        total={productData.total}
        unit={productData.unit}
        biggest={productData.biggest}/>
    </div>
  );
}

export default Scope311;