import data from "../data/mockSuppliers.json";

// Gets scope 3.11 from the JSON and calculates.
export function getProductData() {
    const scope = data["3.11"];

    //collects all products with their calculated calues
    const rows = []; 
    let total = 0;

    //1: Calculate the activity data for each product and add it to the total 
    for (const product of scope.products) {
        const activity = product.quantity * product.lifetimeYears * product.consumptionPerYear;

        //Add a new row to the list with the same fields as in the JSON
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

    //2: now that the total is known, calculate each products share in percent
    for (const row of rows){
        row.share = (row.activity / total) * 100;
    }

    //3: find the product with the largest activity data
    //Start with the first one and switch as soon as a large one is found.
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

//calculates the values for the three KPI cards.
//resuses getProductData()
//The cards pick their products from the data

export function getProductKpis() {
    const rows = getProductData().rows;

    //Card 1: the product that uses the most energy per year
    //card 3: the product that uses the least energy per year
    let highestPerYear = rows[0];
    let lowestPerYear = rows[0];
    for (const row of rows) {
        if (row.consumptionPerYear > highestPerYear.consumptionPerYear) {
            highestPerYear = row;
        }
        if (row.consumptionPerYear < lowestPerYear.consumptionPerYear) {
            lowestPerYear = row;
        }
    }

    //card 2: the product where a single unit uses the most energy over its lifetime.
    let highestLifetime = rows[0];
    for (const row of rows) {
        const lifetimeUse = row.consumptionPerYear * row.lifetimeYears;
        const highestSoFar = highestLifetime.consumptionPerYear * highestLifetime.lifetimeYears;
        if (lifetimeUse > highestSoFar) {
            highestLifetime = row;
        }
    }

    let lowestSalesRank = 1;
    for (const row of rows) {
        if (row.quantity > lowestPerYear.quantity) {
            lowestSalesRank = lowestSalesRank + 1;
        }
    }

    return {
        //card 1: name and how many times more energy per year than the most efficient product
        highestName: highestPerYear.name,
        highestTimesLowest: Math.round(highestPerYear.consumptionPerYear / lowestPerYear.consumptionPerYear),
        //card2: name and how much one unit uses over its whole lifetime
        lifetimeName: highestLifetime.name,
        lifetimeUse: highestLifetime.consumptionPerYear * highestLifetime.lifetimeYears,
        lifetimeYears: highestLifetime.lifetimeYears,
        //card 3: name share of the total consumption in percent and sales rank
        lowestName: lowestPerYear.name,
        lowestShare: lowestPerYear.share,
        lowestSalesRank: lowestSalesRank,
    };
}
