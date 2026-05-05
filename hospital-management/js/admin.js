function login() {
    if (username.value === "admin" && password.value === "1234") {
        sessionStorage.setItem("admin", true);
        showDashboard();
    } else {
        alert("Wrong Credentials");
    }
}

function logout() {
    sessionStorage.removeItem("admin");
    location.reload();
}

function showDashboard() {
    loginBox.classList.add("d-none");
    dashboard.classList.remove("d-none");
    loadDashboard();
}

if (sessionStorage.getItem("admin")) {
    showDashboard();
}

function getData() {
    return JSON.parse(localStorage.getItem("appointments")) || [];
}

function loadDashboard() {
    let data = getData();

    totalCount.innerText = data.length;
    pendingCount.innerText = data.filter(a => a.status === "Pending").length;
    approvedCount.innerText = data.filter(a => a.status === "Approved").length;

    loadTable();
    loadCharts();
}

function loadTable() {
    let data = getData();
    let searchValue = search.value.toLowerCase();

    let filtered = data.filter(a => a.name.toLowerCase().includes(searchValue));

    tableData.innerHTML = "";

    filtered.forEach((a, index) => {
        tableData.innerHTML += `
        <tr>
        <td>${a.id}</td>
        <td>${a.name}</td>
        <td>${a.department}</td>
        <td>${a.date}</td>
        <td>
        <select onchange="updateStatus(${index},this.value)" class="form-select form-select-sm">
        <option ${a.status === "Pending" ? "selected" : ""}>Pending</option>
        <option ${a.status === "Approved" ? "selected" : ""}>Approved</option>
        </select>
        </td>
        <td>
        <button class="btn btn-danger btn-sm" onclick="deleteRow(${index})">Delete</button>
        </td>
        </tr>`;
    });
}

function updateStatus(index, value) {
    let data = getData();
    data[index].status = value;
    localStorage.setItem("appointments", JSON.stringify(data));
    loadDashboard();
}

function deleteRow(index) {
    let data = getData();
    data.splice(index, 1);
    localStorage.setItem("appointments", JSON.stringify(data));
    loadDashboard();
}

function loadCharts() {
    let data = getData();

    let deptCounts = {};
    let statusCounts = { Pending: 0, Approved: 0 };

    data.forEach(a => {
        deptCounts[a.department] = (deptCounts[a.department] || 0) + 1;
        statusCounts[a.status]++;
    });

    new Chart(deptChart, {
        type: "bar",
        data: {
            labels: Object.keys(deptCounts),
            datasets: [{ label: "Appointments", data: Object.values(deptCounts) }]
        }
    });

    new Chart(statusChart, {
        type: "pie",
        data: {
            labels: Object.keys(statusCounts),
            datasets: [{ data: Object.values(statusCounts) }]
        }
    });
}
