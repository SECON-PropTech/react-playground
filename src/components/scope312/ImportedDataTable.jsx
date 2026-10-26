function ImportedDataTable( {products} ) {
  // Den här funktionen tar emot product från Scope312 och mappar ut all data i en tabell
  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col" className="product-column">
              Produkt
            </th>
            <th scope="col">Avfall / material</th>
            <th scope="col">Vikt per produkt</th>
            <th scope="col">Antal</th>
            <th scope="col">Uppdrag</th>
            <th scope="col">Hantering</th>
            <th scope="col">Livslängd</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ImportedDataTable;