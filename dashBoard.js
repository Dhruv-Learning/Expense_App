let form =document.getElementById("expenseForm");
let tBody =document.getElementById("tBody")
let tableBox =document.getElementById("table");
let removeBtn =document.getElementById("removeBtn");

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
  tableBox.style.opacity="1";
  removeBtn.style.opacity="1";
  let tr =document.createElement("tr");
  tr.innerHTML=`
  <td>${tittle}</td>
  <td>${amount}</td>
  <td>${type}</td>
  <td>${modifyed}</td>`;
  tBody.appendChild(tr);

  
  
  document.getElementById("tittle").value="";
  document.getElementById("amount").value="";
}) 

function remove() {
  let tBody =document.getElementById("tBody");
  let tr =document.getElementsByTagName("tr")
  tBody.removeChild(tr[tr.length-1]);
  if(tr.length <1){
    tableBox.style.opacity="0";
    removeBtn.style.opacity="0";
  }
}