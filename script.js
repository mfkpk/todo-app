const todoInput = document.getElementById("todo-input");
const dueInput = document.getElementById("due-date");
const addBtn = document.getElementById("add-btn");
const list = document.getElementById("todo-list");
const searchInput = document.getElementById("search-input");
const darkToggle = document.getElementById("dark-mode-toggle");
const pendingCount = document.getElementById("pending-count");
const doneCount = document.getElementById("done-count");

// Load saved todos
window.onload = () => {
  if (localStorage.getItem("dark") === "true") {
    document.body.classList.add("dark");
  }
  const saved = JSON.parse(localStorage.getItem("todos")) || [];
  saved.forEach(todo => addTodo(todo.text, todo.done, todo.due));
  updateCounts();
};

function saveTodos() {
  const todos = [];
  document.querySelectorAll("#todo-list li").forEach(li => {
    todos.push({
      text: li.querySelector(".text").textContent,
      done: li.classList.contains("done"),
      due: li.getAttribute("data-due") || ""
    });
  });
  localStorage.setItem("todos", JSON.stringify(todos));
  updateCounts();
}

function addTodo(text, done = false, due = "") {
  const li = document.createElement("li");
  if (done) li.classList.add("done");
  li.setAttribute("data-due", due);

  const span = document.createElement("span");
  span.textContent = text + (due ? ` (Due: ${due})` : "");
  span.classList.add("text");
  li.appendChild(span);

  const actions = document.createElement("div");
  actions.classList.add("actions");

  // Done
  const doneBtn = document.createElement("button");
  doneBtn.textContent = "✅";
  doneBtn.classList.add("done-btn");
  doneBtn.onclick = () => {
    li.classList.toggle("done");
    saveTodos();
  };

  // Edit
  const editBtn = document.createElement("button");
  editBtn.textContent = "✏️";
  editBtn.classList.add("edit-btn");
  editBtn.onclick = () => {
    const newText = prompt("Edit your task:", text);
    if (newText !== null) {
      span.textContent = newText + (due ? ` (Due: ${due})` : "");
      li.querySelector(".text").textContent = span.textContent;
      saveTodos();
    }
  };

  // Delete
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "❌";
  deleteBtn.classList.add("delete-btn");
  deleteBtn.onclick = () => {
    li.remove();
    saveTodos();
  };

  actions.appendChild(doneBtn);
  actions.appendChild(editBtn);
  actions.appendChild(deleteBtn);

  li.appendChild(actions);
  list.appendChild(li);
  saveTodos();
}

addBtn.onclick = () => {
  const text = todoInput.value.trim();
  const due = dueInput.value;
  if (text) {
    addTodo(text, false, due);
    todoInput.value = "";
    dueInput.value = "";
  }
};

searchInput.oninput = () => {
  const keyword = searchInput.value.toLowerCase();
  document.querySelectorAll("#todo-list li").forEach(li => {
    const task = li.querySelector(".text").textContent.toLowerCase();
    li.style.display = task.includes(keyword) ? "flex" : "none";
  });
};

darkToggle.onclick = () => {
  document.body.classList.toggle("dark");
  localStorage.setItem("dark", document.body.classList.contains("dark"));
};

function updateCounts() {
  const all = document.querySelectorAll("#todo-list li");
  const done = document.querySelectorAll("#todo-list li.done");
  doneCount.textContent = done.length;
  pendingCount.textContent = all.length - done.length;
}
