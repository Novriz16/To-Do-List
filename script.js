document.addEventListener("DOMContentLoaded", loadTasks);

const addTaskBtn = document.getElementById("add-task-btn");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");

addTaskBtn.addEventListener("click", addTask);

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === "") return;

    const taskItem = document.createElement("li");
    taskItem.classList.add("task-item");
    taskItem.innerHTML = `
        <span>${taskText}</span>
        <button onclick="completeTask(this)">✔️</button>
        <button onclick="deleteTask(this)">🗑️</button>
    `;

    taskList.appendChild(taskItem);
    saveTask(taskText);
    taskInput.value = "";
}

function completeTask(button) {
    const taskItem = button.parentElement;
    taskItem.classList.toggle("completed");
    updateLocalStorage();
}

function deleteTask(button) {
    const taskItem = button.parentElement;
    taskItem.remove();
    updateLocalStorage();
}

function saveTask(taskText) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push({ text: taskText, completed: false });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => {
        const taskItem = document.createElement("li");
        taskItem.classList.add("task-item");
        if (task.completed) taskItem.classList.add("completed");
        taskItem.innerHTML = `
            <span>${task.text}</span>
            <button onclick="completeTask(this)">✔️</button>
            <button onclick="deleteTask(this)">🗑️</button>
        `;
        taskList.appendChild(taskItem);
    });
}

function updateLocalStorage() {
    const tasks = Array.from(taskList.children).map(taskItem => ({
        text: taskItem.querySelector("span").textContent,
        completed: taskItem.classList.contains("completed")
    }));
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
