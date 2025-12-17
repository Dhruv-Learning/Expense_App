//save expense data to localhost

function saveExpense(expenses)
{
    localStorage.setItem("expenses",JSON.stringify(expenses));
}

function getExpense(){
    return JSON.parse(localStorage.getItem("expenses"))||[]
}