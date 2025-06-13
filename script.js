// script.js

// Load tasks from localStorage when page loads
window.onload = function () {
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  savedTasks.forEach(task => addTask(task.text, task.done));
};

function addTask(taskText = null, isDone = false) {
  const taskInput = document.getElementById("taskInput");
  const text = taskText || taskInput.value;

  if (text === "") {
    alert("Please task likho!");
    return;
  }

  const li = document.createElement("li");

  li.innerHTML = `
    <input type="checkbox" ${isDone ? "checked" : ""} onclick="toggleDone(this)">
    <span class="${isDone ? "done" : ""}">${text}</span>
    <button onclick="deleteTask(this)">X</button>
  `;

  document.getElementById("taskList").appendChild(li);
  taskInput.value = "";

  saveTasks();
}

function deleteTask(button) {
  button.parentElement.remove();
  saveTasks();
}

function toggleDone(checkbox) {
  const span = checkbox.nextElementSibling;
  span.classList.toggle("done");
  saveTasks();
}

function saveTasks() {
  const tasks = [];
  document.querySelectorAll("#taskList li").forEach(li => {
    const text = li.querySelector("span").innerText;
    const done = li.querySelector("input[type='checkbox']").checked;
    tasks.push({ text: text, done: done });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
function clearAll() {
  document.getElementById("taskList").innerHTML = "";
  localStorage.removeItem("tasks");
}
