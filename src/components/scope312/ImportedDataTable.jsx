function ImportedDataTable( {products, productInclusion, onToggleInclusion,
  // Den här funktionen tar emot product från Scope312 och mappar ut all data i en tabell
  // productInclusion ifall produkten ska inkluderas och onToggleInclusion ifall användaren vill ändra status

}){
  return (
    <div className="table-responsive">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Produkt</th>
            <th scope="col">Avfall / material</th>
            <th scope="col">Vikt per produkt</th>
            <th scope="col">Antal</th>
            <th scope="col">Uppdrag</th>
            <th scope="col">Hantering</th>
            <th scope="col">Livslängd</th>
            <th scope="col">Inkludera</th>
            <th scope="col">Status</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => {
            const billingStatus = product["billing-status"]
              ?.trim()
              .toLowerCase();

            const isNonBillable = [
              "ej faktureringsbar",
              "ej faktureringsbara",
            ].includes(billingStatus);

            // true = inkludera
            // false = ej inkludera
            // null/undefined = användaren har inte valt ännu
            const inclusion = productInclusion[product.id];

            const isReady = !isNonBillable || inclusion !== null &&
              inclusion !== undefined;

            return (
              <tr key={product.id}>
                <td>{product.name}</td>

                <td>
                  {product.materials.map((material) => (
                    <div key={material.name}>
                      {material.name}
                    </div>
                  ))}
                </td>

                <td>
                  {product.materials.map((material) => (
                    <div key={material.name}>
                      {material.kg} kg
                    </div>
                  ))}
                </td>

                <td>{product.quantity}</td>

                <td>
                  {product.projects.map((project) => (
                    <div key={project}>{project}</div>
                  ))}
                </td>

                <td>{product["waste-managing"]}</td>

                <td>{product["life-cycle"]} år</td>

                <td>
                  {isNonBillable ? (
                    <label>
                      <input
                        type="checkbox"
                        checked={inclusion === true}
                        onChange={() =>
                          onToggleInclusion(product.id)
                        }
                      />{" "}
                      {inclusion === null ||
                      inclusion === undefined
                        ? "Välj"
                        : inclusion
                          ? "Inkludera"
                          : "Ej inkludera"}
                    </label>
                  ) : null}
                </td>

                <td>
                  {isReady ? (
                    <span className="badge bg-success">
                      Redo
                    </span>
                  ) : (
                    <span className="badge bg-warning text-dark">
                      Ej faktureringsbar
                    </span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default ImportedDataTable;