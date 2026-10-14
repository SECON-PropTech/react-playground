import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Scope31 from "./pages/Scope31";
import Scope311 from "./pages/Scope311";
import Scope312 from "./pages/Scope312";
import MaterialDetails from "./components/scope312/MaterialDetails";
import TopTen from "./components/scope312/Topten";

const pageComponents = {
  "scope-3.1": Scope31,
  "scope-3.11": Scope311,
  "scope-3.12": Scope312,
  "topTen": TopTen,
};

function App() {
  // null = startsidan (tom)
  const [activePage, setActivePage] = useState(null);
  const Page = pageComponents[activePage];
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  
  function handlePageSelect(page) {
    setSelectedMaterial(null);
    setActivePage(page);
  } 

  return (
    <div className="d-flex flex-grow-1">
      <Sidebar activePage={activePage} onSelect={handlePageSelect}/>
      <main className="flex-grow-1 p-4">
        {selectedMaterial ? (
          <MaterialDetails
            materialName={selectedMaterial}
            onBack={() => setSelectedMaterial(null)}/>)
         : (Page && <Page onSelectMaterial={setSelectedMaterial} onSelect={handlePageSelect}/>)}
      </main>
    </div>
  );
}

export default App;
