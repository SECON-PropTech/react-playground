import data from "../../data/mockSuppliers.json";

function RandomFact() {
// Denna funktion hämtar miljöfakta direkt från json filen och visar den i en alert-ruta
  const facts = data["3.12"].environmentalFacts;

  const randomIndex = Math.floor(Math.random() * facts.length);
  const randomFact = facts[randomIndex];

  return (
    <div
      className="alert alert-primary d-flex align-items-center"
      role="alert"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="currentColor"
        className="bi flex-shrink-0 me-2"
        viewBox="0 0 16 16"
        aria-hidden="true"
      >
        <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
      </svg>

      <div>
        <strong>Visste du att?</strong>
        <p className="mb-0">{randomFact.fact}</p>
      </div>
    </div>
  );
}

export default RandomFact;