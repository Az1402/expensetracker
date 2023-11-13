let totalIncome = 0;
let expenses = [];



const incomeInput = document.getElementById('income');
const incomeEnterBtn = document.getElementById('income-enter-btn');
const showIncome = document.querySelector('.Showincome h2');
const categorySelect = document.getElementById('category-select');
const amountInput = document.getElementById('amount');
const dateInput = document.getElementById('date');
const addBtn = document.getElementById('add');
const expensesTableBody = document.getElementById('expnese-table-body');
const totalAmountCell = document.getElementById('total-amount');


incomeEnterBtn.addEventListener('click', function() {
    const income = parseInt(incomeInput.value);
    if (isNaN(income) || income <= 0) {
        alert('Please enter a valid income');
        return;
    }
    totalIncome = income;
    updateShowIncome();
    incomeInput.disabled = true;
    incomeEnterBtn.disabled = true;
});



addBtn.addEventListener('click', function() {
    const category = categorySelect.value;
    const amount = parseInt(amountInput.value);
    const date = dateInput.value;

    if (category === '' || isNaN(amount) || amount <= 0 || date === '') {
        alert('Please fill out all fields correctly');
        return;
    }

    expenses.push({ category, amount, date });


    totalAmountCell.textContent = calculateTotalAmount();
    updateShowIncome();

    const newRow = expensesTableBody.insertRow();
    const categoryCell = newRow.insertCell();
    const amountCell = newRow.insertCell();
    const dateCell = newRow.insertCell();
    const deleteCell = newRow.insertCell();
    const deleteBtn = document.createElement('button');

    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', function() {
        const rowIndex = newRow.rowIndex - 1;
        totalAmountCell.textContent -= expenses[rowIndex].amount;
        expenses.splice(rowIndex, 1);
        newRow.remove();
        updateShowIncome();
    });

    categoryCell.textContent = category;
    amountCell.textContent = amount;
    dateCell.textContent = date;
    deleteCell.appendChild(deleteBtn);
});



function calculateTotalAmount() {
    let totalExpenses = 0;
    for (const expense of expenses) {
        totalExpenses += expense.amount;
    }
    return totalExpenses;
}

function updateShowIncome() {
    const totalExpenses = calculateTotalAmount();
    const netIncome = totalIncome - totalExpenses;
    showIncome.textContent = `Income: ${totalIncome} Rupees || Balance : ${netIncome} Rupees`;
}
