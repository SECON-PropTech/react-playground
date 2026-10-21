//KPI cards
//The same component is used three times with different props.
function KpiCard({ title, value, text}) {
    return (
        <div className="card">
            <div className="card-body">
                <p>{title}</p>
                <p>{value}</p>
                <p>{text}</p>
            </div>
        </div>
    );
}

export default KpiCard;