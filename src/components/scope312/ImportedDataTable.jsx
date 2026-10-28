import { useState } from "react";

function ImportedDataTable( {products, productInclusion, onToggleInclusion, onEditProduct
  // Den här funktionen tar emot product från Scope312 och mappar ut all data i en tabell
  // productInclusion ifall produkten ska inkluderas och onToggleInclusion ifall användaren vill ändra status
}){
  const [editingProductId, setEditingProductId] = useState(null); // editingProductId anger vilken rad som redigeras.
  const [draftProduct, setDraftProduct] = useState(null); // draftProduct innehåller ändringar som inte sparats än.
  function startEditing(product) {
    setEditingProductId(product.id);

    setDraftProduct({
      ...product,
      materials: product.materials.map((material) => ({ ...material })),
      projects: [...product.projects],
    });
  }

  function handleFieldChange(field, value) {
    setDraftProduct((previous) => ({
      ...previous,
      [field]: value,
    }));
  }

  function handleMaterialChange(index, field, value) {
    setDraftProduct((previous) => ({
      ...previous,
      materials: previous.materials.map((material, i) =>
        i === index ? { ...material, [field]: value } : material
      ),
    }));
  }

  function handleProjectChange(index, value) {
    setDraftProduct((previous) => ({
      ...previous,
      projects: previous.projects.map((project, i) =>
        i === index ? value : project
      ),
    }));
  }

  function saveEditing() {
    const updatedProduct = {
      ...draftProduct,
      quantity: Number(draftProduct.quantity),
      materials: draftProduct.materials.map((material) => ({
        ...material,
        kg: Number(material.kg),
      })),
      "life-cycle":
        draftProduct["life-cycle"] === ""
          ? undefined
          : Number(draftProduct["life-cycle"]),
    };

    onEditProduct(editingProductId, updatedProduct);

    setEditingProductId(null);
    setDraftProduct(null);
  }

  function cancelEditing() {
    setEditingProductId(null);
    setDraftProduct(null);
  }


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
            
            const isEditing = editingProductId === product.id;

            return (
              <tr key={product.id}>
      
                <td>{product.name}</td>
               
                <td> 
                  {isEditing
                    ? draftProduct.materials.map((material, index) => (
                        <div key={index} className="mb-2">
                          <input
                            type="text"
                            className="form-control form-control-sm"
                            value={material.name}
                            onChange={(e) =>
                              handleMaterialChange(index, "name", e.target.value)
                            }
                          />
                        </div>
                      ))
                    : product.materials.map((material, index) => (
                        <div key={index}>
                          {material.name}
                        </div>
                      ))}
                </td>

                <td>
                  {isEditing
                    ? draftProduct.materials.map((material, index) => (
                        <div key={index} className="mb-2">
                          <div className="input-group input-group-sm">
                            <input
                              type="number"
                              min="0"
                              step="any"
                              className="form-control"
                              value={material.kg}
                              onChange={(e) =>
                                handleMaterialChange(index, "kg", e.target.value)
                              }
                            />
                            <span className="input-group-text">kg</span>
                          </div>
                        </div>
                      ))
                    : product.materials.map((material, index) => (
                        <div
                          key={index}
                          title={
                            product.measured === true
                              ? "Uppmätt vikt"
                              : "Uppskattad vikt"
                          }
                          style={{ cursor: "help" }}
                        >
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

                <td>
                  {isEditing ? (
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      value={draftProduct["waste-managing"] ?? ""}
                      onChange={(e) =>
                        handleFieldChange("waste-managing", e.target.value)
                      }
                    />
                  ) : (
                    product["waste-managing"]
                  )}
                </td>

                <td>
                  {isEditing ? (
                    <div className="input-group input-group-sm">
                      <input
                        type="number"
                        min="0"
                        step="any"
                        className="form-control"
                        value={draftProduct["life-cycle"] ?? ""}
                        onChange={(e) =>
                          handleFieldChange("life-cycle", e.target.value)
                        }
                      />
                      <span className="input-group-text">år</span>
                    </div>
                  ) : (
                    <>
                      {product["life-cycle"]} år
                    </>
                  )}
                </td>

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

                <td>
                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={() => startEditing(product)}
                  >
                    Redigera
                  </button>
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