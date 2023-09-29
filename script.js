

document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("taskName");
    const dueDateInput = document.getElementById("dueDate");
    const priorityInput = document.getElementById("priority");
    const addTaskButton = document.getElementById("addTask");
    const statusFilter = document.getElementById("statusFilter");
    const taskList = document.getElementById("taskList");
    const tasks = [];

    // Function to render tasks
    function renderTasks() {
        taskList.innerHTML = "";
        const filteredTasks = filterTasks(statusFilter.value);
        filteredTasks.forEach((task, index) => {
            const li = document.createElement("li");
            li.innerHTML = `
                <strong>${task.name}</strong> 
                <small>Due: ${task.dueDate}</small>
                <span class="priority ${task.priority.toLowerCase()}">${task.priority}</span>
                <div class="buttons">
                    <button class="edit" data-index="${index}">Edit</button>
                    <button class="delete" data-index="${index}">Delete</button>
                </div>
            `;
            taskList.appendChild(li);
        });
    }

    // Function to add a task
    function addTask() {
        const taskName = taskInput.value.trim();
        const dueDate = new Date(dueDateInput.value).toLocaleString();
        const priority = priorityInput.value;
        if (taskName === "") return;

        tasks.push({
            name: taskName,
            dueDate: dueDate,
            priority: priority,
            status: "todo", // Default status is "To Do"
        });

        renderTasks();
        saveTasksToLocalStorage();
        taskInput.value = "";
        dueDateInput.value = "";
    }

    // Function to edit a task
    function editTask(index) {
        const newTaskName = prompt("Edit the task:", tasks[index].name);
        if (newTaskName !== null) {
            tasks[index].name = newTaskName;
            renderTasks();
            saveTasksToLocalStorage();
        }
    }

    // Function to delete a task
    function deleteTask(index) {
        if (confirm("Are you sure you want to delete this task?")) {
            tasks.splice(index, 1);
            renderTasks();
            saveTasksToLocalStorage();
        }
    }

    // Function to filter tasks by status
    function filterTasks(status) {
        if (status === "all") return tasks;
        return tasks.filter((task) => task.status === status);
    }

    // Event Listeners
    addTaskButton.addEventListener("click", addTask);
    taskList.addEventListener("click", function (e) {
        if (e.target.classList.contains("edit")) {
            editTask(e.target.getAttribute("data-index"));
        } else if (e.target.classList.contains("delete")) {
            deleteTask(e.target.getAttribute("data-index"));
        }
    });
    statusFilter.addEventListener("change", function () {
        renderTasks();
    });

    // Load tasks from local storage
    function loadTasksFromLocalStorage() {
        const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.push(...savedTasks);
        renderTasks();
    }

    // Save tasks to local storage
    function saveTasksToLocalStorage() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // Load tasks from local storage when the page loads
    loadTasksFromLocalStorage();
});
