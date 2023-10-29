const todoInput = document.querySelector(".todo__block.current__block input");
const todoList = document.querySelector(".todo__block__lists");
const todoChoices = document.querySelector(".todo__block.todo__choices");
const clearDone = document.querySelector(".clear__done");

const todos = JSON.parse(localStorage.getItem("todos")) || [];

function renderTodos() {
    todoList.innerHTML = "";
    todos.forEach((todo, index) => {
        const todoItem = createTodoItem(todo, index);
        todoList.insertAdjacentHTML("beforeend", todoItem);
    });
    updateTodoChoices();
}

function createTodoItem(todo, index) {
    const checkedClass = todo.completed ? "s-check-circle bx-tada" : "circle";
    return `
        <div class="todo__block">
            <i class="bx bx-${checkedClass} todo__icon" onclick="toggleTodo(${index})"></i>
            <input type="text" value="${todo.text}" disabled />
            <i class="bx bx-x todo__icon" onclick="deleteTodo(${index})"></i>
        </div>
    `;
}

function toggleTodo(index) {
    todos[index].completed = !todos[index].completed;
    saveTodos();
    renderTodos();
}

function deleteTodo(index) {
    todos.splice(index, 1);
    saveTodos();
    renderTodos();
}

function updateTodoChoices() {
    const activeTodos = todos.filter((todo) => !todo.completed);
    const itemsLeft = activeTodos.length;

    todoChoices.querySelector("span").textContent = itemsLeft;

    if (todos.length > 0) {
        todoChoices.classList.remove("hidden");
    } else {
        todoChoices.classList.add("hidden");
    }
}

function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
    updateTodoChoices();
}

document.querySelector("form").addEventListener("submit", function (e) {
    e.preventDefault();
    const text = todoInput.value.trim();

    if (text) {
        todos.push({ text, completed: false });
        saveTodos();
        renderTodos();
        todoInput.value = "";
    }
});

clearDone.addEventListener("click", function () {
    todos = todos.filter((todo) => !todo.completed);
    saveTodos();
    renderTodos();
});

renderTodos();