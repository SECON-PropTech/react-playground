import { getMaterialTotals } from "../../utils/materialCalculations";

function MyTable({onSelectMaterial}) { //Funktionen används när användaren klickar på ett material i tabellen.
  const totals = getMaterialTotals();
 // Hämtar den summerade vikten för varje material från materialCalculations.
 // och returnerar en tabell med datan
 // Vid klick (onClick) skickas materialnamnet till onSelectMaterial  

    return (
        <table className="table table-success table-striped">
            <thead>
                <tr>
                    <th>Material</th>
                    <th>Vikt (kg)</th>
                </tr>
            </thead>

            <tbody>
                {Object.entries(totals).map(([material, kg]) => (
                    <tr key={material}>
                        <td>
                            <button
                                type="button"
                                className="btn p-0 text-dark text-decoration-none"
                                onClick={() => onSelectMaterial(material)}> 
                                {material}
                            </button>
                        </td>
                        <td>{kg.toLocaleString("sv-SE")}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
export default MyTable;