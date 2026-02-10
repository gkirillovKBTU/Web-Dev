const todoInput = document.getElementById('todoInput');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');


let todos = JSON.parse(localStorage.getItem('todos')) || [];

function init() {
    renderTodos();
    
    addBtn.addEventListener('click', addTodo);
}

function addTodo() {
    const text = todoInput.value.trim();
    
    if (text === '') {
        todoInput.focus();
        return;
    }

    const todo = {
        id: Date.now(),
        text: text,
        completed: false
    };

    todos.push(todo);
    saveTodos();
    renderTodos();
    
    todoInput.value = '';
}

function toggleTodo(id) {
    todos = todos.map(todo => 
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    saveTodos();
    renderTodos();
}


function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    saveTodos();
    renderTodos();
}

function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function renderTodos() {

    todoList.innerHTML = todos.map(todo => `
        <li class="todo-item" data-id="${todo.id}">
            <div class="checkbox-wrapper">
                <input 
                    type="checkbox" 
                    ${todo.completed ? 'checked' : ''}
                    onchange="toggleTodo(${todo.id})"
                >
            </div>
            <span class="todo-text ${todo.completed ? 'completed' : ''}">${todo.text}</span>
            <button class="delete-btn" onclick="deleteTodo(${todo.id})">Delete</button>
        </li>
    `).join('');
}

init();