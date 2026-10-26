import "./SupplierChart.css";

function SupplierChart({ suppliers }) {

    // organizes suppliers based on amount in SEK, highest at the top
    // only brings the top 5.

    //Sort from highest to lowest. if b.total is larger than a.total, place b first
    //.slice() is used to ensure a top 5
    const topSuppliers = [...suppliers]
    .sort((a, b) => b.total - a.total)
    .slice(0, 5);

    // The highest price is used to figure out the diagram's lentgh.
    const maxTotal = topSuppliers[0]?.total || 1;
    
    return (
        <div>
            <h3>Topp 5 leverantörer</h3>

            {/*Each supplier gets its own diagram. */}
            {topSuppliers.map((supplier) =>(

                <div className="chart-row" key={supplier.id}>

                    <p>{supplier.name}</p>

                    {/*Diagram length in %  */}
                    <div className="chart-background">
                        <div className="chart-bar"
                        style={{
                            width: `${(supplier.total / maxTotal) * 100}%`
                        }}
                        />
                    </div>

                    <p>{supplier.total.toLocaleString("sv-SE")} kr</p>

                </div>
            ))}
        </div>
    );
}

export default SupplierChart;