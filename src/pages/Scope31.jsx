import { useState } from "react";

import mockSuppliers from "../data/mockSuppliers.json";
import SupplierList from "../components/scope31/SupplierList";
import SupplierDetails from "../components/scope31/SupplierDetails";
import SupplierChart from "../components/scope31/SupplierChart";



function Scope31() {
  
  {/*Takes all suppliers from Scope 3.1 in the JSON file. */}
  const suppliers = mockSuppliers["3.1"].suppliers;

  // 
  const [selectedId, setSelectedId] = useState(1);

  // The user's text will be saved in the search field. 
  const [search, setSearch] = useState("");

  // Ensuring that the inputed text matches the search result.
  //toLowerCase sets text to lowercase + .includes() to make sure the supplier matches the searched text
  // No matter how the user writes a supplier, it will return desired result.
  const filteredSuppliers = suppliers.filter((supplier) =>
  supplier.name.toLowerCase().includes(search.toLowerCase())
);

  // Looks for the supplier with the Id that fits the selected ID
  const selectedSupplier = suppliers.find(
    (supplier) => supplier.id === selectedId
  );

  return (
    <div>
      <h2>Scope 3.1</h2>

      {/*Shows the first 5 suppliers in a diagram. */}
      <SupplierChart suppliers={suppliers} />

      {/*Searchfield for all suppliers */}
      <input
      type="text"
      placeholder="Sök leverantör här"
      value={search}
      onChange={(event) => setSearch(event.target.value)}
      />

      {/*Shows list of suppliers for the user to choose from */}
      <SupplierList 
      suppliers={filteredSuppliers}
      selectedId={selectedId}
      onSelect={setSelectedId}
      
      />

      {/*Shows details about the supplier if it exists */}
      {selectedSupplier && (
        <SupplierDetails supplier={selectedSupplier} />
      )}
    </div>
  );
}

export default Scope31;
