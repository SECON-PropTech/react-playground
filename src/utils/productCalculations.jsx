import data from "../data/mockSuppliers.json";


export function getProductData() {
    const scope = data["3.11"];

    const rows = [];
    let total = 0;

    for (const product of scope.products) {
        const activity = product.quantity * product.lifetimeYears * product.consumptionPerYear;

        rows.push({
            id: product.id,
            name: product.name,
            quantity: product.quantity,
            lifetimeYears: product.lifetimeYears,
            consumptionPerYear: product.consumptionPerYear,
            activity: activity,
        });
        
        total = total + activity;
    }

    for (const row of rows){
        row.share = (row.activity / total) * 100;
    }

    let biggest = rows[0];
    for (const row of rows) {
        if (row.activity > biggest.activity) {
            biggest = row;
        }
    }

    return {
        unit: scope.unit,
        period: scope.period,
        rows: rows,
        total: total,
        biggest: biggest,
    };
}