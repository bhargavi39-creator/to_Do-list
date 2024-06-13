// script.js

document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from local storage
    loadTasks();

    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        addTask(taskInput.value);
        taskInput.value = '';
    });

    taskList.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete')) {
            deleteTask(e.target.parentElement.parentElement);
        } else if (e.target.classList.contains('edit')) {
            editTask(e.target.parentElement.parentElement);
        } else if (e.target.classList.contains('complete')) {
            toggleComplete(e.target.parentElement.parentElement);
        }
    });

    function addTask(task) {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${task}</span>
            <div class="actions">
                <button class="complete">✔️</button>
                <button class="edit">✏️</button>
                <button class="delete">❌</button>
            </div>
        `;
        taskList.appendChild(li);
        saveTasks();
    }

    function deleteTask(taskItem) {
        taskItem.remove();
        saveTasks();
    }

    function editTask(taskItem) {
        const newTask = prompt('Edit task:', taskItem.firstElementChild.textContent);
        if (newTask) {
            taskItem.firstElementChild.textContent = newTask;
            saveTasks();
        }
    }

    function toggleComplete(taskItem) {
        taskItem.classList.toggle('completed');
        saveTasks();
    }

    function saveTasks() {
        const tasks = [];
        taskList.querySelectorAll('li').forEach(taskItem => {
            tasks.push({
                text: taskItem.firstElementChild.textContent,
                completed: taskItem.classList.contains('completed')
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.classList.toggle('completed', task.completed);
            li.innerHTML = `
                <span>${task.text}</span>
                <div class="actions">
                    <button class="complete">✔️</button>
                    <button class="edit">✏️</button>
                    <button class="delete">❌</button>
                </div>
            `;
            taskList.appendChild(li);
        });
    }
});
