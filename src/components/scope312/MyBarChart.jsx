// Denna komponent skapar ett stapeldiagram över mängden av ett visst material per produkt
// Den hämtar inte data själv, utan tar emot produktdata och materialnamn via props från den komponent som använder den (materialDetails).
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function MaterialBarChart({ products, materialName }) {
  const chartData = products.map((product) => ({
    name: product.productName,
    kg: product.kgPerProduct,
  }));

  return (
    <div>
      <h4>Mängd {materialName} per produkt</h4>

      <div style={{ width: "100%", height: 350 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{
              top: 10,
              right: 20,
              left: 10,
              bottom: 60,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis
              dataKey="name"
              angle={-35}
              textAnchor="end"
              interval={0}
              height={80}
              tick={{ fontSize: 12 }}
            />

            <YAxis
              label={{
                value: "kg per produkt",
                angle: -90,
                position: "insideLeft",
              }}
            />

            <Tooltip
              formatter={(value) => [`${value} kg`, "Mängd"]}
            />

            <Bar
              dataKey="kg"
              fill="#198754"
              name="Mängd"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default MaterialBarChart;