import { formatNumber, formatPercent } from "../../utils/format";

//Colors for the bar. The first product gets the first color,
//the second product gets the second color and so on.

const COLORS = ["#4a6fa5", "#7f9bc8", "#b4c5e0", "#c9a34a", "#bdbdbd"];

//Total consumption as a single bar split up per product.

function ConsumptionBar({ rows, total, unit, biggest }) {
    return (
        <div>
            <p>Aktivitetsdata, förbrukning</p>
            <p>{formatNumber(total)} {unit}</p>
            <p>{biggest.name} står för {formatPercent(biggest.share)}% av den totala förbrukningen</p>

            {/*One part per product. Width = the products share in percent */}
            <div className="progress-stacked">
                {rows.map((row, index) => (
                   <div key={row.id} className="progress" style={{ width: row.share + "%" }}>
                    <div className="progress-bar" style={{ backgroundColor: COLORS[index % COLORS.length] }}>
                     </div>
                    </div> 
                ))}
            </div>
            {/*Legend below the bar: name and percent for each product */}
            <div className="row">
                {rows.map((row) => ( 
                    <div key={row.id} className="col">
                        <p>{row.name}</p>
                        <p>{formatPercent(row.share)}%</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ConsumptionBar;