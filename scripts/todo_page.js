/**
 *  Variables
 */
const currentItemId = localStorage.getItem('currentTodo')
const currentItem = JSON.parse(localStorage.getItem(currentItemId));
let todoList = currentItem.todoList;
let sortType = currentItem.sortType;


/** 
 *  Listeners
 */
document.querySelectorAll('.js-sort-option').forEach(item => {
    item.addEventListener('click', ()=>{
       sortType = item.id;
       saveInDb()
    })
})

document.querySelector('.js-quit').addEventListener('click', (e)=>{
    getPage('file:///H:/Websites/js%20learning/todo-app/index.html');
})


/**
 *  Display Document Elements
 */
const todosDisplay = document.querySelector('.js-todo-display');
document.querySelector('.js-todo-name').innerHTML = currentItem.name;


/**
 *  Init Running Functions
 */
renderTodoList();


/**
 *  Functions
 */

    // Database Operations
function saveInDb() {
    const newItem = {
        id: currentItem.id,
        name: currentItem.name,
        todoList: todoList,
        sortType: sortType
    }
    localStorage.setItem(`${currentItem.id}`, JSON.stringify(newItem));
    renderTodoList()
}

    // TodoItems Operations
function addTodo(){
    const todoTitleInput = document.querySelector('.js-todo-title');
    const dueDateInput = document.querySelector('.js-dueDate');
    const descInput = document.querySelector('.js-description');
    const priorityInput = document.querySelector('.js-select-rank');


    const newTodo = new Todo(
        todoTitleInput.value,
        dueDateInput.value,
        descInput.value,
        null,
        priorityInput.value
    );

    todoList.push(newTodo);
    saveInDb()

    todoTitleInput.value = "";
    dueDateInput.value = "";
    descInput.value = "";
}

function deleteTodoItem(todoIndex) {
    todoList.splice(todoIndex, 1);
    saveInDb()
}

function checkItem(todoIndex) {
    const item = todoList.filter((i)=> i.title === todoList[todoIndex].title);
    console.log(item)
    const currentStatus = item[0].status;
    item[0].status = currentStatus === 'completed' 
        ? 'uncompleted'
        : 'completed';

    todoList[todoIndex] = item[0];

    saveInDb()
}

function deleteAllItems() {
    todoList = [];
    saveInDb();
    closeDialog('.js-alert-overlay')
}

function renderTodoList() {
    todoList = sortItems(sortType, todoList, 'todoItem')
    let todoText = '';

    let i = 0;

    while (i < todoList.length) {
        const {title, dueDate, desc, status, priority} = todoList[i]
        const colorName = getPriority(priority);
        todoText += `
        <div class="todoItem">
            <div class="badge ${colorName}"></div>
            <button class="delete" onclick='deleteTodoItem(${i})'>x</button>
            <div class='todoText'>
                <p class="todoTitle">${title}</p>
                <div class="todoBody">
                    <p class="todoDesc">
                        ${desc}
                    </p>
                    <input type="checkbox" onclick="checkItem(${i})" 
                        ${status === 'completed' ? 'checked' : ''} class="js-checkbox">
                </div>
                <div class="todoBottom">
                    <p>Status: <span>${status}</span></p>
                    <p>due date: <span>${dueDate}</span></p>
                </div>
            </div>
        </div>
        `;
        i++;
    }
    todosDisplay.innerHTML = todoText;
}

    // Operations on this todolist
function deleteTodoList() {
    localStorage.removeItem(currentItemId);
    getPage('file:///H:/Websites/js%20learning/todo-app/index.html')
}