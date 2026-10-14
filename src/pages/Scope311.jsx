
import { getProductData } from "../utils/productCalculations";
import ProductTable from "../components/scope311/ProductTable";

function Scope311() {

  const productData = getProductData();

  return (
    <div>
      <p>Produktrapport</p>
      <h1>Energiförbrukning per produkt</h1>
      <p>En översikt över sålda produkter och hur mycket energi de förbrukar under sin livslängd.</p>

      <ProductTable
        rows={productData.rows}
        total={productData.total}
        unit={productData.unit}
      />
    </div>
  );
}

export default Scope311;