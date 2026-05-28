const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

addTaskBtn.addEventListener("click", function() {
    const task = taskInput.value;
    if (task !== "") {
        const item = document.createElement("li");
        item.textContent = task;
        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";
        removeBtn.addEventListener("click", function(event) {
            event.stopPropagation();
            item.remove();
        });
        item.addEventListener("click", function() {
            item.classList.toggle("completed");
        });
        item.appendChild(removeBtn);
        taskList.appendChild(item);
        taskInput.value = "";
    } else {
        alert("Please enter a task.");
    }
});