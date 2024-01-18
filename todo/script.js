let todosContainer = document.querySelector('.todos')
const done = document.querySelector('.done');
const all = document.querySelector('.all');
const doing = document.querySelector('.doing');

let todos = [];
let doneTasks = [];

let todoform = document.querySelector('#todoform')
let newtodo = document.getElementById("createtodo")
let checkedstatus = document.querySelector(".checkbox")

todoform.addEventListener("submit", (e) => {
    e.preventDefault()

    if (newtodo.value.trim() !== "") {
        let todo = {
            taskname: newtodo.value.trim(),
            status: checkedstatus.checked
        }

        todos.push(todo)

        localStorage.setItem('todos', JSON.stringify(todos))

        displayTodos()
    }
})

let displayTodos = function () {

    let taskItems = localStorage.getItem("todos")

    taskItems = JSON.parse(taskItems)

    let tasks = document.querySelectorAll('.todos .todo')

    tasks.forEach(el => {
        el.remove()
    })

    if (taskItems) {
        console.log(taskItems)
        todosContainer.textContent = ""
        taskItems.forEach((el, index) => {
            let todo = document.createElement('div');
            todo.className = "todo";

            let checkbox = document.createElement("input")
            checkbox.type = "checkbox"
            checkbox.className = "checkbox"
            checkbox.checked = el.status

            let taskname = document.createElement('div')
            taskname.textContent = el.taskname

            todo.appendChild(checkbox)
            todo.appendChild(taskname)

            todosContainer.appendChild(todo)
        })
    } else {
        todosContainer.textContent = "No Tasks Available"
    }
}

displayTodos()
// Done Tasks
done.addEventListener('click', () => {
    let taskItems = localStorage.getItem("todos")
    taskItems = JSON.parse(taskItems)
    if(taskItems) {
    // Reset the todos div
    todosContainer.textContent = ""
    taskItems.forEach((task, i) => {
        if(task.status){
            let todo = document.createElement('div');
            todo.className = "todo";

            let checkbox = document.createElement("input")
            checkbox.type = "checkbox"
            checkbox.className = "checkbox"
            checkbox.checked = task.status

            let taskname = document.createElement('div')
            taskname.textContent = task.taskname

            todo.appendChild(checkbox)
            todo.appendChild(taskname)

            todosContainer.appendChild(todo)
        }
    })} else {
            todosContainer.textContent = "No completed tasks"
        }
})
// Active tasks
doing.addEventListener('click', () => {
    let taskItems = localStorage.getItem("todos")
    taskItems = JSON.parse(taskItems)
    if(taskItems) {
    // Reset the todos div
    todosContainer.textContent = ""
    taskItems.forEach((task, i) => {
        if(!task.status){
            console.log(task)
            let todo = document.createElement('div');
            todo.className = "todo";

            let checkbox = document.createElement("input")
            checkbox.type = "checkbox"
            checkbox.className = "checkbox"
            checkbox.checked = task.status

            let taskname = document.createElement('div')
            taskname.textContent = task.taskname

            todo.appendChild(checkbox)
            todo.appendChild(taskname)

            todosContainer.appendChild(todo)
        }
    })} else {
            todosContainer.textContent = "No active tasks"
        }
})

all.addEventListener('click', () => {
    displayTodos();
})

