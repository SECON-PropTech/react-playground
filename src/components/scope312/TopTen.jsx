import { getTopWasteProducts } from "../../utils/materialCalculations";
import MyPieChart from "./MyPieChart";

function TopTen() {

  const products = getTopWasteProducts(10);


  const chartData = products.map((product) => ({
    name: product.name,
    value: product.totalKg,
  }));

  return (
    <div>
      <h2>Top 10 produkter med högst materialvikt</h2>

      <div className="container">
        <div className="row">

          <div className="col-md-6">
            <h3>Produktlista</h3>
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th>Placering</th>
                  <th>Produkt</th>
                  <th>Antal</th>
                  <th>Vikt/st (kg)</th>
                  <th>Total (kg)</th>
                </tr>
              </thead>

              <tbody>
                {products.map((product, index) => (
                  <tr key={product.id}>
                    <td>{index + 1}</td>
                    <td>{product.name}</td>
                    <td>{product.quantity}</td>
                    <td>{product.kgPerProduct}</td>
                    <td>{product.totalKg}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="col-md-6">
            <MyPieChart data={chartData} unit="kg" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopTen;