// global variables
const studentName = document.getElementById("studentName");
const grade1 = document.getElementById("grade1");
const grade2 = document.getElementById("grade2");
const studentRows = document.getElementById("studentRows");
const studentTable = document.getElementById("studentTable");
const classAverage = document.getElementById("classAverage");
const addStudentBtn = document.getElementById("addStudentBtn");
const notice = document.getElementById("notice");

let gradeCount = 0;
let overallAverage = 0;

// Debug button used during the practical exam
// Hidden in the final interface
const debugBtn = document.getElementById("debugBtn");
debugBtn.addEventListener("click", () => {
    console.log(studentName, grade1, grade2, addStudentBtn, studentTable, classAverage);
});

function calculateAverage(score1, score2) {
    return (Number(score1) + Number(score2)) / 2;
}

function getResult(average) {
    return average >= 7 ? "Approved" : "Failed";
}

function calculateClassAverage(average) {
    overallAverage += average;
    gradeCount++;
    return overallAverage / gradeCount;
}

addStudentBtn.addEventListener("click", () => {
    if (studentName.value === "" || grade1.value === "" || grade2.value === "") {
        notice.textContent = "Please fill in all fields.";
    } else {
        notice.textContent = "";
        const average = calculateAverage(grade1.value, grade2.value);
        const newRow = document.createElement("tr");
        const nameCell = document.createElement("td");
        nameCell.textContent = studentName.value;
        const averageCell = document.createElement("td");
        averageCell.textContent = average.toFixed(2);
        const statusCell = document.createElement("td");
        statusCell.textContent = getResult(average);
        newRow.appendChild(nameCell);
        newRow.appendChild(averageCell);
        newRow.appendChild(statusCell);
        studentTable.appendChild(newRow);
        if (average >= 7) {
            newRow.style.backgroundColor = "lightgreen";
        } else {
            newRow.style.backgroundColor = "lightcoral";
        }
        classAverage.textContent = calculateClassAverage(average).toFixed(2);
        studentName.value = "";
        grade1.value = "";
        grade2.value = "";
    }
});