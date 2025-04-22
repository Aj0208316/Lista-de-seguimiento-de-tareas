document.addEventListener('DOMContentLoaded', function () {
  /* === MENÚ HAMBURGUESA === */
  const menuBurger = document.getElementById('menu_burger');
  const ulLinks = document.querySelector('.ul_links');

  document.addEventListener('click', function (event) {
    if (!menuBurger.contains(event.target) && !ulLinks.contains(event.target) && menuBurger.checked) {
      menuBurger.checked = false;
    }
  });

  const enlacesMenu = document.querySelectorAll('.ul_links a');
  enlacesMenu.forEach(enlace => {
    enlace.addEventListener('click', function () {
      menuBurger.checked = false;
    });
  });

  /* === TASK TRACKER === */
  const taskInput = document.getElementById('taskInput');
  const addTaskBtn = document.getElementById('addTaskBtn');
  const taskList = document.getElementById('taskList');

  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  function renderTasks() {
    taskList.innerHTML = '';

    const pending = tasks.filter(t => !t.completed);
    const completed = tasks.filter(t => t.completed);
    const sortedTasks = [...pending, ...completed];

    sortedTasks.forEach((task, index) => {
      const li = document.createElement('li');
      li.classList.toggle('completed', task.completed);

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.className = 'checkbox';
      checkbox.checked = task.completed;
      checkbox.addEventListener('change', () => toggleTask(index));

      const span = document.createElement('span');
      span.textContent = task.text;

      const deleteBtn = document.createElement('button');
      deleteBtn.className = 'delete-btn';
      deleteBtn.innerHTML = '🗑️';
      deleteBtn.addEventListener('click', () => deleteTask(index));

      li.appendChild(checkbox);
      li.appendChild(span);
      li.appendChild(deleteBtn);

      taskList.appendChild(li);
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  function addTask() {
    const text = taskInput.value.trim();
    if (text !== '') {
      tasks.push({ text, completed: false });
      taskInput.value = '';
      renderTasks();
    }
  }

  function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
  }

  function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
  }

  if (addTaskBtn && taskInput) {
    addTaskBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keydown', e => {
      if (e.key === 'Enter') {
        addTask();
      }
    });
  }

  if (taskList) {
    renderTasks();
  }
});
