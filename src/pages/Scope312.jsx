import { useState } from "react";
import mockSuppliers from "../data/mockSuppliers.json";
import RandomFact from "../components/scope312/RandomFact";
import ImportedDataTable from "../components/scope312/ImportedDataTable";

const months = [
  { value: "01", label: "Januari" },
  { value: "02", label: "Februari" },
  { value: "03", label: "Mars" },
  { value: "04", label: "April" },
  { value: "05", label: "Maj" },
  { value: "06", label: "Juni" },
  { value: "07", label: "Juli" },
  { value: "08", label: "Augusti" },
  { value: "09", label: "September" },
  { value: "10", label: "Oktober" },
  { value: "11", label: "November" },
  { value: "12", label: "December" },
];

function Scope312({ onSelect }) {
  // Hämtar produkterna som tillhör Scope 3.12.
  // TODO: Ersätt mockdata med riktig data från backend/API.
  const [products, setProducts] = useState(  //products bytas ut mot riktig data
    () => mockSuppliers["3.12"]["sold product"]
  );

  //Hämtar dagens datum och hanterar vilken period användaren har valt att se
  const today = new Date();
  const currentYear = String(today.getFullYear());
  const currentMonth = String(today.getMonth() + 1).padStart(2, "0"); //För att formatera månaden rätt
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
 
  
  //Funktioner som ändrar vilka produkter som inkluderas.
  // TODO: När backend finns, skicka productId och nytt värde till backend så att användarens val sparas.
  const [productInclusion, setProductInclusion] = useState(() =>
  Object.fromEntries(
    products.map((product) => {
      const status = product["billing-status"]
        ?.trim()
        .toLowerCase();

      const isNonBillable = [
        "ej faktureringsbar",
        "ej faktureringsbara",
      ].includes(status);

      return [product.id, isNonBillable ? null : true]; // true=produkten är inkluderad, false=produkten är exkluderad, null  = produkten är inte faktureringsbar och ger användare ett val
    })
  )
);

  function toggleProductInclusion(productId) {
    setProductInclusion((previous) => ({
      ...previous,
      [productId]: !previous[productId],
    }));
  }


  //FILTRERING AV PRODUKTER
  //Visar endast produkter som har ett datum inom valt år och vald månad.
  const filteredProducts = products.filter((product) => {
    if (!product.date) return false;

    const [year, month] = product.date.split("-");

    const matchesYear = year === currentYear;
    const matchesMonth =
      selectedMonth === "all" || month === selectedMonth;

    return matchesYear && matchesMonth;
  });


  let productContent;

  if (filteredProducts.length > 0) {
    productContent = (
      <ImportedDataTable   
      products={filteredProducts}
      productInclusion={productInclusion}
      onToggleInclusion={toggleProductInclusion}
      onEditProduct={editProductRow}
      /> 
    );
  } else {
    productContent = (
      <p>Inga produkter hittades för den valda perioden.</p>
    );
  }


  // 3. REDIGERING AV PRODUKTER
  // Uppdaterar endast produkten med det valda ID:t.
  function editProductRow(productId, updatedProduct) {
    setProducts((previousProducts) =>
      previousProducts.map((product) =>
        product.id === productId
          ? { ...product, ...updatedProduct, id: product.id }
          : product
      )
    );
  }


  return (
    <div>
      <h2>Scope 3.12</h2>
      <h3>Slutbehandling av sålda produkter</h3>

      <div className="mb-3">
        <label htmlFor="month-filter" className="form-label">
          Visa period
        </label>

        <select
          id="month-filter"
          className="form-select"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        >
          <option value="all">Hela året</option>

          {months.map((month) => (
            <option key={month.value} value={month.value}>
              {month.label}
            </option>
          ))}
        </select>
      </div>

      {productContent}

      <button
        type="button"
        className="btn btn-info"
        onClick={() => onSelect("materials")}
      >
        Visa materialkategorier
      </button>

      <button
        type="button"
        className="btn btn-info ms-2"
        onClick={() => onSelect("topTen")}
      >
        Visa top 10 största avfall
      </button>

      <button
        type="button"
        className="btn btn-info mb-3"
        onClick={() => onSelect("projects")}
      >
        Projekt
      </button>

      <RandomFact />
    </div>
  );
}

export default Scope312;
