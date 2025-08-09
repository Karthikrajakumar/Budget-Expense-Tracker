const expenseAmount = document.getElementById("expenseAmount");
const expenseCategory = document.getElementById("expenseCategory");
const addExpenseBtn = document.getElementById("addExpense");
const expenseList = document.getElementById("expenseList");
const totalAmount = document.getElementById("totalAmount");
const budgetInput = document.getElementById("budgetInput");
const setBudgetBtn = document.getElementById("setBudget");
const remainingAmount = document.getElementById("remainingAmount");
const progress = document.getElementById("progress");
const searchInput = document.getElementById("search");
const clearAllBtn = document.getElementById("clearAll");

let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
let budget = parseFloat(localStorage.getItem("budget")) || 0;

function renderExpenses() {
  expenseList.innerHTML = "";
  let total = 0;

  expenses.forEach((expense, index) => {
    total += expense.amount;

    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${expense.category}</strong> - ₹${expense.amount}
      <button class="delete" onclick="deleteExpense(${index})">X</button>
    `;
    expenseList.appendChild(li);
  });

     totalAmount.textContent = total;
     updateBudget(total);
     localStorage.setItem("expenses", JSON.stringify(expenses));
}

function addExpense() {
  const amount = parseFloat(expenseAmount.value);
  const category = expenseCategory.value;

  if (isNaN(amount) || amount <= 0) {
    alert("Please enter a valid amount");
    return;
  }

  expenses.push({ category, amount });
  expenseAmount.value = "";
  renderExpenses();
}

function deleteExpense(index) {
  expenses.splice(index, 1);
  renderExpenses();
}

    function setBudget() {
        budget = parseFloat(budgetInput.value);
          if (isNaN(budget) || budget <= 0) {
            alert("Enter a valid budget");
                   return;
                }
  localStorage.setItem("budget", budget);
  updateBudget(totalAmount.textContent);
}

function updateBudget(total) {
  let remaining = budget - total;
  remainingAmount.textContent = remaining >= 0 ? remaining : 0;

  let percent = budget > 0 ? (total / budget) * 100 : 0;
  progress.style.width = Math.min(percent, 100) + "%";
  progress.style.background = percent >= 100 ? "red" : "green";
}

searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();
  document.querySelectorAll("#expenseList li").forEach(li => {
    li.style.display = li.innerText.toLowerCase().includes(query) ? "" : "none";
  });
});

clearAllBtn.addEventListener("click", () => {
  if (confirm("Are you sure you want to clear all expenses?")) {
    expenses = [];
    localStorage.removeItem("expenses");
    renderExpenses();
  }
});

function updateBudget(total) {
  let remaining = budget - total;
  remainingAmount.textContent = remaining >= 0 ? remaining : 0;

  let percent = budget > 0 ? (total / budget) * 100 : 0;
  progress.style.width = Math.min(percent, 100) + "%";
  progress.style.background = percent >= 100 ? "red" : "green";

  
  if (remaining === 1000) {
    alert("⚠️ Only ₹1000 is remaining in your budget!");
  }

  
  if (remaining < 0) {
    alert("🚨 You have exceeded your budget plan!");
  }
}


addExpenseBtn.addEventListener("click", addExpense);
setBudgetBtn.addEventListener("click", setBudget);
renderExpenses();
updateBudget(totalAmount.textContent);

