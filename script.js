const input = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const list = document.getElementById("todo-list");

// Load todos on page load
window.onload = () => {
  const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
  savedTodos.forEach(todo => addTodo(todo.text, todo.done));
};

// Save todos to localStorage
function saveTodos() {
  const todos = [];
  document.querySelectorAll("#todo-list li").forEach(li => {
    todos.push({
      text: li.firstChild.textContent,
      done: li.classList.contains("done")
    });
  });
  localStorage.setItem("todos", JSON.stringify(todos));
}

// Add a new todo
function addTodo(text, done = false) {
  const li = document.createElement("li");

  const span = document.createElement("span");
  span.textContent = text;
  li.appendChild(span);

  if (done) li.classList.add("done");

  // Done button
  const doneBtn = document.createElement("button");
  doneBtn.textContent = "✅";
  doneBtn.classList.add("done-btn");
  doneBtn.addEventListener("click", () => {
    li.classList.toggle("done");
    saveTodos();
  });

  // Delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "❌";
  deleteBtn.classList.add("delete-btn");
  deleteBtn.addEventListener("click", () => {
    li.remove();
    saveTodos();
  });

  li.appendChild(doneBtn);
  li.appendChild(deleteBtn);

  list.appendChild(li);
  saveTodos();
}

addBtn.addEventListener("click", () => {
  const todoText = input.value.trim();
  if (todoText !== "") {
    addTodo(todoText);
    input.value = "";
  }
});
