import { getMaterialDetails, getMaterialTotalKg,} from "../../utils/materialCalculations";
import MaterialBarChart from "./MyBarChart";

function MaterialDetails({ materialName, onBack }) { // (onBack är en funktion som körs när användaren vill gå tillbaka
// Denna komponent använder två färdiga funktioner från materialCalculations,
// och stoppar in informationen den får i en tabell och ett stapeldiagram
  const products = getMaterialDetails(materialName);
  const totalKg = getMaterialTotalKg(materialName);

    return (
        <div>
        <button
            type="button"
            className="btn btn-outline-secondary mb-3"
            onClick={onBack}
        >
            ← Tillbaka
        </button>

        <h2>{materialName}</h2>

        <p>
            Total mängd:{" "}
            <strong>{totalKg.toLocaleString("sv-SE")} kg</strong>
        </p>
        <MaterialBarChart products={products} materialName={materialName}/>

        <h4>Produkter som innehåller materialet</h4>

        <table className="table table-striped">
            <thead>
            <tr>
                <th>Produkt</th>
                <th>Antal sålda</th>
                <th>Kg per produkt</th>
                <th>Total vikt (kg)</th>
            </tr>
            </thead>

            <tbody>
            {products.map((product) => (
                <tr key={product.id}>
                <td>{product.productName}</td>
                <td>{product.quantity}</td>
                <td>{product.kgPerProduct}</td>
                <td>
                    {product.totalKg.toLocaleString("sv-SE")}
                </td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    ); 
}

export default MaterialDetails;