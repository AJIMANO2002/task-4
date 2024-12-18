

let transactions = [];





const filterRadios = document.querySelectorAll('input[name="filter"]');

function updateUI() {
    let filteredTransactions = transactions;
    const selectedFilter = document.querySelector('input[name="filter"]:checked').value;
    if (selectedFilter !== "all") {
        filteredTransactions = transactions.filter(transaction => transaction.type === selectedFilter);
    }


    const entryList = document.getElementById("entry-list");
    entryList.innerHTML = "";


    filteredTransactions.forEach(transaction => {
        const listItem = document.createElement("li");
        listItem.classList.add("p-3", "border-b", "border-gray-200", "flex", "justify-between");
        listItem.innerHTML = `
            <div>${transaction.description} - $${transaction.amount} (${transaction.type})</div>
            <button class="text-red-500" onclick="deleteTransaction(${transaction.id})">Delete</button>
        `;
        entryList.appendChild(listItem);
    });



    const income = transactions.filter(t => t.type === "income").reduce((sum, t) => sum + t.amount, 0);
    const expenses = transactions.filter(t => t.type === "expense").reduce((sum, t) => sum + t.amount, 0);
    const balance = income - expenses;


    const totalIncome = document.getElementById("total-income");
    const totalExpenses = document.getElementById("total-expenses");
    const netBalance = document.getElementById("net-balance");

    totalIncome.textContent = income;
    totalExpenses.textContent = expenses;
    netBalance.textContent = balance;
}


const addBtn = document.getElementById("add-btn");
const amountInput = document.getElementById("amount");
const descriptionInput = document.getElementById("description");
addBtn.addEventListener("click", () => {
    const description = descriptionInput.value.trim();
    const amount = parseFloat(amountInput.value.trim());
    const typeSelect = document.getElementById("type");
    const type = typeSelect.value;

    if (!description || isNaN(amount)) {
        alert("Please enter valid description and amount.");
        return;
    }

    const transaction = {
        id: Date.now(),description,amount,type };

    transactions.push(transaction); 
    updateUI();
    descriptionInput.value = "";
    amountInput.value = "";
});



const resetBtn = document.getElementById("reset-btn");
resetBtn.addEventListener("click", () => {
    descriptionInput.value = "";
    amountInput.value = "";
    typeSelect.value = "income";
});

function deleteTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);
    updateUI(); 
}

filterRadios.forEach(radio => {
    radio.addEventListener("change", updateUI); 
});

updateUI();
