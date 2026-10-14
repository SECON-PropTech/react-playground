
// Adds separators using Swedish formatting
// Example: 800000 becomes "800 000"
// "en-US" would give 800,000
export function formatNumber(number){
    return number.toLocaleString("sv-SE") 
}

// Rounds to one decimal and replaces the dot with a comma
// Example: 75.716 becomes 75,7
export function formatPercent(number){
    return number.toFixed(1).replace(".", ",")
}

