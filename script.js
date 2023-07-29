document.addEventListener("DOMContentLoaded", function () {
    // Function to add a new task to the output list
    function addTaskToOutput(taskText, isChecked) {
        const output = document.getElementById("output");
        const taskList = output.querySelector("ul");
        const newTask = document.createElement("li");
        newTask.innerHTML = `
            ${taskText}
            <div class="options">
                <input type="checkbox" ${isChecked ? "checked" : ""}>
                <i class="fas fa-trash delete"></i>
            </div>
        `;
        taskList.appendChild(newTask);
    }

    // Function to save the tasks and checkbox states to localStorage
    function saveTasksToLocalStorage() {
        const output = document.getElementById("output");
        const taskItems = output.querySelectorAll("li");

        const tasks = [];
        taskItems.forEach((taskItem) => {
            const taskText = taskItem.firstChild.textContent.trim();
            const isChecked = taskItem.querySelector("input[type=checkbox]").checked;
            tasks.push({ text: taskText, checked: isChecked });
        });

        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // Function to load saved tasks from localStorage and add them to the output
    function loadTasksFromLocalStorage() {
        const tasksJson = localStorage.getItem("tasks");
        if (tasksJson) {
            const tasks = JSON.parse(tasksJson);
            tasks.forEach((task) => {
                addTaskToOutput(task.text, task.checked);
            });
        }
    }

    // Load tasks from localStorage when the page loads
    loadTasksFromLocalStorage();

    // Add event listener to the "Add Task" button
    const addTaskButton = document.getElementById("addTask");
    addTaskButton.addEventListener("click", function () {
        const input = document.getElementById("task");
        const taskText = input.value.trim();
        if (taskText !== "") {
            addTaskToOutput(taskText, false);
            input.value = "";
            saveTasksToLocalStorage();
        }
    });

    // Add event listener to the "Delete" icons to remove tasks from the output
    const output = document.getElementById("output");
    output.addEventListener("click", function (event) {
        if (event.target.classList.contains("delete")) {
            const taskItem = event.target.closest("li");
            if (taskItem) {
                taskItem.remove();
                saveTasksToLocalStorage();
            }
        }
    });

    // Add event listener to the checkboxes to save their state
    output.addEventListener("change", function (event) {
        if (event.target.type === "checkbox") {
            saveTasksToLocalStorage();
        }
    });
});