// Receives the supplier list, the supplier ID and the click function
function SupplierList({ suppliers, selectedId, onSelect }) {
    return (
        <div>
            <h3>Alla leverantörer</h3>

            {/* Goes through every supplier and shows them accordingly */}
            {suppliers.map((supplier) => (

                // Every supplier gets its own element with a unique ID.
                <div key={supplier.id}>

                    {/*button chooses the selected supplier upon click.*/}
                    <button
                    type="button"
                    onClick={() => onSelect(supplier.id)}
                    >
                        {supplier.name}
                    </button>

                    {/*Shows the amount in SEK */}
                    <p>{supplier.total} kr</p>

                    {/*Shows text IF the supplier is selected through &&*/}
                    {selectedId === supplier.id && (
                        <p>Vald leverantör</p>
                    )}
                    <hr />
                </div>
            ))}
        </div>
    );
}

// Ensures the component is available on other files
export default SupplierList;