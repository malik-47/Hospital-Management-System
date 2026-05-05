document.getElementById("appointmentForm").addEventListener("submit", function (e) {

    e.preventDefault();

    let appointments = JSON.parse(localStorage.getItem("appointments")) || [];

    let date = document.getElementById("date").value;
    let time = document.getElementById("time").value;

    let duplicate = appointments.find(a => a.date === date && a.time === time);

    if (duplicate) {
        alert("This time slot already booked!");
        return;
    }

    let newAppointment = {
        id: "HOSP-" + Date.now(),
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        department: document.getElementById("department").value,
        date: date,
        time: time,
        status: "Pending"
    };

    appointments.push(newAppointment);

    localStorage.setItem("appointments", JSON.stringify(appointments));

    alert("Appointment Booked Successfully!");

    this.reset();
});
// Appointment Booking
document.getElementById("appointmentForm").addEventListener("submit", function(e){
    e.preventDefault();

    let appointments = JSON.parse(localStorage.getItem("appointments")) || [];

    let date = document.getElementById("date").value;
    let time = document.getElementById("time").value;

    let duplicate = appointments.find(a => a.date === date && a.time === time);
    if(duplicate){
        alert("This time slot already booked!");
        return;
    }

    let tokenNo = appointments.length + 1; // Auto Token Number

    let newAppointment = {
        id: "HOSP-" + Date.now(),
        token: tokenNo,
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        department: document.getElementById("department").value,
        date: date,
        time: time,
        status: "Pending",
        amount: 500 // You can set different department fee if needed
    };

    appointments.push(newAppointment);
    localStorage.setItem("appointments", JSON.stringify(appointments));

    alert(`Appointment Booked Successfully! Token No: ${tokenNo}`);

    this.reset();
});

/// ================= PRINT TOKEN & BILL =================
document.getElementById("printTokenBtn").addEventListener("click", function(){
    let appointments = JSON.parse(localStorage.getItem("appointments")) || [];
    if(appointments.length === 0){
        alert("No appointments yet!");
        return;
    }

    // Last booked appointment
    let lastAppointment = appointments[appointments.length - 1];

    let printContent = `
    <div style="font-family:sans-serif; text-align:center; padding:20px;">
        <h2>MediCare Pro Hospital</h2>
        <h3>Patient Token & Bill</h3>
        <hr>
        <p><strong>Token No:</strong> ${lastAppointment.department}-${lastAppointment.token}</p>
        <p><strong>Name:</strong> ${lastAppointment.name}</p>
        <p><strong>Mobile No:</strong> ${lastAppointment.phone}</p>
        <p><strong>Department:</strong> ${lastAppointment.department}</p>
        <p><strong>Date:</strong> ${lastAppointment.date}</p>
        <p><strong>Time:</strong> ${lastAppointment.time}</p>
        <p><strong>Amount:</strong> PKR ${lastAppointment.amount}</p>
        <hr>
        <p>Thank you for visiting MediCare Pro!</p>
    </div>
    `;

    let printWindow = window.open("", "", "width=400,height=600");
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.print();
});
// ================== APPOINTMENT BOOKING WITH TOKEN PER DEPT ==================

const departmentTokens = JSON.parse(localStorage.getItem("departmentTokens")) || {};

// Fees for each department
const departmentFees = {
    "Cardiology": 2000,
    "Neurology": 2500,
    "Pediatrics": 1500,
    "Orthopedics": 1800,
    "Gynecology": 2200,
    "Emergency": 3000
};

// Form submit
document.getElementById("appointmentForm").addEventListener("submit", function(e){
    e.preventDefault();

    let appointments = JSON.parse(localStorage.getItem("appointments")) || [];

    let name = document.getElementById("name").value.trim();
    let phone = document.getElementById("phone").value.trim();
    let department = document.getElementById("department").value;
    let date = document.getElementById("date").value;
    let time = document.getElementById("time").value;

    // Check duplicate slot in same department
    let duplicate = appointments.find(a => a.department === department && a.date === date && a.time === time);
    if(duplicate){
        alert("This time slot for " + department + " is already booked!");
        return;
    }

    // Generate token per department
    if(!departmentTokens[department]) departmentTokens[department] = 1;
    else departmentTokens[department]++;

    let tokenNo = departmentTokens[department];

    // New Appointment Object
    let newAppointment = {
        id: "HOSP-" + Date.now(),
        token: tokenNo,
        name: name,
        phone: phone,
        department: department,
        date: date,
        time: time,
        status: "Pending",
        amount: departmentFees[department] || 500
    };

    appointments.push(newAppointment);

    localStorage.setItem("appointments", JSON.stringify(appointments));
    localStorage.setItem("departmentTokens", JSON.stringify(departmentTokens));

    alert(`Appointment Booked!\nToken No: ${tokenNo}\nFee: PKR ${newAppointment.amount}`);

    this.reset();
});