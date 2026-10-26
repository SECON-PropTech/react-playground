import { getAllProjects } from "../../utils/materialCalculations"
import poolImg from "../../assets/badhus.jpg"

function Projects( { onSelect, onSelectProject } ) {
  // Denna funktion hämtar funktionen getAllProjects från utils som plockar ut alla projekt.
  // OCh returnerar en sida med cards för varje projekt med titel, bild och knapp onSelect till projectDetail
  const projects = getAllProjects();
  return(
    <div className="container">
      <h2>Projekt</h2>

      <div className="row">
        {projects.map((project) => (
          <div className="col-md-4 mb-3" key={project}>
            <div className="card" style={{ width: "18rem" }}>
              <img
                src={poolImg}
                className="card-img-top"
                alt="Badhus med en pool"
              />

              <div className="card-body">
                <h5 className="card-title">{project}</h5>

                <button
                  type="button"
                  className="btn btn-info"
                  onClick={() => {
                    onSelectProject(project);
                    onSelect("projectDetail");
                  }}
                >
                  Visa projekt
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

}
export default Projects;