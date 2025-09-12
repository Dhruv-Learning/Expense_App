// Select DOM elements
const form = document.getElementById("expenseForm");
const list = document.getElementById("expenseList");
const titleInput = document.getElementById("title");
const amountInput = document.getElementById("amount");
const categoryInput = document.getElementById("category");
const container = document.querySelector(".insideContainer");


const ctx = document.getElementById("expenseChart").getContext("2d");

// Chart.js chart 
let chart;  // to hold chart data..

// Get stored expenses from localStorage

let expenses = getExpense() || [];

// Initial render
renderExpenses(expenses);
renderChart(expenses);

// Form submission 
form.addEventListener("submit", function (e) {
    e.preventDefault();

    const title = titleInput.value.trim();
    const amount = parseFloat(amountInput.value);
    const type = categoryInput.value;
    const date = new Date();

    if (!title || isNaN(amount)) {
        alert("Please enter valid title and amount.");
        return;
    }

    const expense = {
        id: Date.now(),
        title,
        amount,
        type,
        date: date.toISOString()
    };

    expenses.push(expense);
    saveExpense(expenses);

    renderExpenses(expenses);
    renderChart(expenses);
    form.reset();
});

// Handle expense deletion
list.addEventListener("click", function (e) {
    if (e.target.classList.contains("delete-btn")) {
        const id = parseInt(e.target.dataset.id);
        expenses = expenses.filter(exp => exp.id !== id);
        saveExpense(expenses);
        renderExpenses(expenses);
        renderChart(expenses);
    }
});

// Render expense list
function renderExpenses(data) {
    list.innerHTML = "";

    if (data.length === 0) {
        list.innerHTML = "<li>No expenses yet.</li>";
        return;
    }

    data.forEach(exp => {
        const li = document.createElement("li");
        const formattedDate = new Date(exp.date).toLocaleString();
        li.innerHTML = ` 
            You spent ₹${exp.amount.toFixed(2)} on ${exp.type} (${exp.title}) at ${formattedDate} 
            <button class="delete-btn" data-id="${exp.id}">❌</button>
        `;
        list.appendChild(li);
    });
}

// Chart.js pie chart
function renderChart(data) {
    const categoryTotals = {};

    data.forEach(exp => {
        categoryTotals[exp.type] = (categoryTotals[exp.type] || 0) + exp.amount;
    });

    const labels = Object.keys(categoryTotals);
    const values = Object.values(categoryTotals);

    if (chart) chart.destroy();

    chart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                label: 'Expenses by Category',
                data: values,
                backgroundColor: [
                    '#ff6384', '#36a2eb', '#ffce56', '#8bc34a', '#ff9800', '#9c27b0'
                ]
            }]
        },
        options: {
            responsive: true
        }
    });
}

//fliter
const filterSelect = document.createElement("select");
filterSelect.innerHTML = `
    <option value="all">All Time</option>
    <option value="monthly">This Month</option>
    <option value="weekly">This Week</option>
`;
filterSelect.style.marginLeft = "1rem";
container.appendChild(filterSelect);

// Handle filter change
filterSelect.addEventListener("change", () => {
    const filtered = filterExpenses(expenses, filterSelect.value);
    renderExpenses(filtered);
    renderChart(filtered);
});

// Filter function by time period
function filterExpenses(data, filter) {
    const now = new Date();

    if (filter === "monthly") {
        return data.filter(exp => {
            const date = new Date(exp.date);
            return (
                date.getMonth() === now.getMonth() &&
                date.getFullYear() === now.getFullYear()
            );
        });
    }

    if (filter === "weekly") {
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(now.getDate() - 7);
        return data.filter(exp => new Date(exp.date) >= oneWeekAgo);
    }

    return data; 
}


// DOM elements for summary and budget
const totalIncomeEl = document.getElementById("totalIncome");
const totalExpenseEl = document.getElementById("totalExpense");
const balanceEl = document.getElementById("balance");
const budgetInput = document.getElementById("budgetInput");
const setBudgetBtn = document.getElementById("setBudgetBtn");
const budgetStatus = document.getElementById("budgetStatus");

let totalIncome = parseFloat(localStorage.getItem("income")) || 0;
let budget = parseFloat(localStorage.getItem("budget")) || 0;

// Update Summary UI
function updateSummary() {
  const totalExpense = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const balance = totalIncome - totalExpense;

  totalIncomeEl.textContent = totalIncome.toFixed(2);
  totalExpenseEl.textContent = totalExpense.toFixed(2);
  balanceEl.textContent = balance.toFixed(2);

  // Budget check
  if (budget > 0) {
    if (totalExpense >= budget) {
      budgetStatus.textContent = "⚠️ You have exceeded your budget!";
      budgetStatus.style.color = "red";
    } else if (totalExpense >= budget * 0.8) {
      budgetStatus.textContent = "⚠️ You are nearing your budget limit.";
      budgetStatus.style.color = "orange";
    } else {
      budgetStatus.textContent = "✅ You are within your budget.";
      budgetStatus.style.color = "green";
    }
  } else {
    budgetStatus.textContent = "Set your monthly budget!";
    budgetStatus.style.color = "#555";
  }
}

// Set budget button
setBudgetBtn.addEventListener("click", () => {
  budget = parseFloat(budgetInput.value);
  if (!isNaN(budget) && budget > 0) {
    localStorage.setItem("budget", budget);
    updateSummary();
  } else {
    alert("Enter a valid budget amount!");
  }
});

// Call updateSummary whenever data changes
renderExpenses = (function(originalFn) {
  return function(data) {
    originalFn(data);
    updateSummary();
  };
})(renderExpenses);

// Add Income function (example: manually setting)
function addIncome(amount) {
  totalIncome += amount;
  localStorage.setItem("income", totalIncome);
  updateSummary();
}

// Example: addIncome(5000); // Call this when user adds salary etc.

