let form =document.getElementById("expenseForm");
let tBody =document.getElementById("tBody")

form.addEventListener("submit",function(e){
  e.preventDefault();
  let tittle =document.getElementById("tittle").value;
  let amount =document.getElementById("amount").value;
  let type =document.getElementById("category").value;


  // Save the data in local stogare...
  let expenses =getExpense();
  expenses.push({tittle,amount,type})
  console.log(expenses);
  saveExpense(expenses);
  let date =Date.now();
  let modifyed =new Date(date)

  // Display data on scren...
  let tr =document.createElement("tr");
  tr.innerHTML=`
<td>${tittle}</td>
<td>${amount}</td>
<td>${type}</td>`
  tBody.appendChild(tr);
  document.getElementById("tittle").value="";
  document.getElementById("amount").value="";
}) 