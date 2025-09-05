// Save expense data to localHost....
function saveExpense(expennses){
  localStorage.setItem("expenses",JSON.stringify(expennses));
}

function getExpense(){
  return JSON.parse(localStorage.getItem("expenses")) || [];
}