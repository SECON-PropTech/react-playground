import {formatNumber, formatPercent} from "../../utils/format"

function ProductTable({rows, total, unit}){
    return (
        <div>
            <h3> Sålda produkter</h3>
            <p>
                {rows.length} produkter, {unit} per enhet
            </p>

            <table className="table">
                <thead>
                    <tr>
                        <th>Produkt</th>
                        <th>Antal</th>
                        <th>Livslängd (år)</th>
                        <th>Förbrukning/år ({unit})</th>
                        <th>Aktivitetsdata ({unit})</th>
                        <th>Andel</th>
                    </tr>
                </thead>

                <tbody>
                 {/* One row per product. key={row.id} 
                 lets React tell the rows apart */}
                 {rows.map((row) => (
                    <tr key={row.id}>
                        <td>{row.name}</td>
                        <td>{row.quantity}</td>
                        <td>{row.lifetimeYears}</td>
                        <td>{formatNumber(row.consumptionPerYear)}</td>
                        <td>{formatNumber(row.activity)}</td>
                        <td>
                        {/* Small bar. the width is the share as a percentage. insert below*/}

                            {formatPercent(row.share)}%
                        </td>
                    </tr>
                 ))}   
                </tbody>

                <tfoot>
                    <tr>
                        <td>Total</td>
                        <td colSpan={3}></td>
                        <td>{formatNumber(total)}</td>
                        <td>100%</td>
                    </tr>
                </tfoot>
            </table>

        </div>
    )
}

export default ProductTable;