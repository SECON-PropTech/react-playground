import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Scope31 from "./pages/Scope31";
import Scope311 from "./pages/Scope311";
import Scope312 from "./pages/Scope312";
import MaterialDetails from "./components/scope312/MaterialDetails";
import MaterialOverview from "./components/scope312/MaterialOverview";
import TopTen from "./components/scope312/Topten";
import Projects from "./components/scope312/Projects";
import ProjectDetails from "./components/scope312/ProjectDetails";

const pageComponents = {
  "scope-3.1": Scope31,
  "scope-3.11": Scope311,
  "scope-3.12": Scope312,
  "materials": MaterialOverview,
  "topTen": TopTen,
  "projects" : Projects,
  "projectDetail" : ProjectDetails,
};

function App() {
  // null = startsidan (tom)
  const [activePage, setActivePage] = useState(null);
  const Page = pageComponents[activePage];
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  
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

            : activePage === "projectDetail" ? (
          <ProjectDetails
            projectName={selectedProject}
            onBack={() => handlePageSelect("projects")}
          />)
          
            : (Page && <Page 
            onSelectMaterial={setSelectedMaterial}
            onSelectProject={setSelectedProject} 
            onSelect={handlePageSelect} 
            onBack={() => handlePageSelect("scope-3.12")}/>)}
      </main>
    </div>
  );
}

export default App;
