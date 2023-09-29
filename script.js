 // Select DOM elements
const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTask");
const taskList = document.getElementById("taskList");

// Add a task to the list
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
        const li = document.createElement("li");
        li.innerHTML = `
            ${taskText}
            <button class="delete">Delete</button>
        `;
        taskList.appendChild(li);
        taskInput.value = "";
        saveTasksToLocalStorage();
    }
}

// Remove a task from the list
function removeTask(e) {
    if (e.target.classList.contains("delete")) {
        e.target.parentElement.remove();
        saveTasksToLocalStorage();
    }
}

// Save tasks to local storage
function saveTasksToLocalStorage() {
    const tasks = [...taskList.querySelectorAll("li")].map((li) => li.textContent.trim());
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks from local storage
function loadTasksFromLocalStorage() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach((taskText) => {
        const li = document.createElement("li");
        li.innerHTML = `
            ${taskText}
            <button class="delete">Delete</button>
        `;
        taskList.appendChild(li);
    });
}

// Event Listeners
addTaskButton.addEventListener("click", addTask);
taskList.addEventListener("click", removeTask);

// Load tasks from local storage when the page loads
window.addEventListener("DOMContentLoaded", loadTasksFromLocalStorage);
