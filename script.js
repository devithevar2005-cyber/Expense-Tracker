document.addEventListener("DOMContentLoaded", function () {

    const expenseName = document.getElementById("expenseName");
    const amount = document.getElementById("amount");
    const category = document.getElementById("category");
    const date = document.getElementById("date");
    const addExpenseBtn = document.getElementById("addExpenseBtn");
    const expenseTable = document.getElementById("expenseTable");
    const totalAmount = document.getElementById("totalAmount");

    let expenses = [];

    addExpenseBtn.addEventListener("click", function () {

        console.log("Add button clicked"); // 🔴 DEBUG LINE

        const name = expenseName.value.trim();
        const amt = Number(amount.value);
        const cat = category.value;
        const dt = date.value;

        if (name === "" || amt <= 0 || dt === "") {
            alert("Please fill all fields correctly");
            return;
        }

        const expense = {
            id: Date.now(),
            name,
            amount: amt,
            category: cat,
            date: dt
        };

        expenses.push(expense);
        renderTable();
        clearInputs();
    });

    function renderTable() {
        expenseTable.innerHTML = "";
        let total = 0;

        expenses.forEach((exp) => {
            total += exp.amount;

            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${exp.name}</td>
                <td>₹${exp.amount.toFixed(2)}</td>
                <td>${exp.category}</td>
                <td>${exp.date}</td>
                <td>
                    <button class="btn btn-sm btn-danger">Delete</button>
                </td>
            `;

            row.querySelector("button").addEventListener("click", () => {
                expenses = expenses.filter(e => e.id !== exp.id);
                renderTable();
            });

            expenseTable.appendChild(row);
        });

        totalAmount.textContent = total.toFixed(2);
    }

    function clearInputs() {
        expenseName.value = "";
        amount.value = "";
        category.value = "Food";
        date.value = "";
    }

});
