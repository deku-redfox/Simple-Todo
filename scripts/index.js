/**
 *  Variables
 */
let pageSortType = getSortType();


/** 
 *  Listeners
 */
document.querySelector('.js-form').addEventListener('submit', function(e) {
    e.preventDefault()
    createTodo()
})

document.querySelector('.js-confirm').addEventListener('click', ()=> {
    deleteAllTodos()
    allTodos = [];
    closeDialog('.js-alert-overlay')
    renderTodos()
})

document.querySelectorAll('.js-sort-option').forEach(item => {
    item.addEventListener('click', ()=>{
       pageSortType = item.id;
       saveSortType(pageSortType);
       renderTodos()
    })
})


/**
 *  Display Document Elements
 */
const todoCardList = document.querySelector('.js-list-card');


/**
 *  Inputs Document Elements
 */
const createInput = document.querySelector('.js-todo-name');


/**
 *  Init Running Functions
 */
renderTodos();



/**
 *  Functions
 */

    // Operations on Todos
function createTodo() {
    const todoId = allTodos.length;
    const newTodo = {
        id: todoId,
        name: createInput.value,
        sortType: 'nameAsc',
        todoList: []
    }
    allTodos.push(newTodo);
    localStorage.setItem(`${todoId}`, JSON.stringify(newTodo));
    openTodo(todoId)
}

function openTodo(id) {
    localStorage.setItem('currentTodo', JSON.stringify(id))
    getPage('file:///H:/Websites/js%20learning/todo-app/pages/todo_page.html');
}


    // Render Todos
function renderTodos() {
    allTodos = sortItems(pageSortType, allTodos)
    let displayText = '';
    
    allTodos.forEach((item, i) =>{

        const {todoList} = item;
        let completedTodos = todoList.filter(
            (item)=> item.status === 'completed');
        
        displayText += `
        <div class="todoCard">
            <h1 class="todoName">${item.name}</h1>

            <div class="todoInfos">
                <p class="js-task">Taches: ${todoList.length}</p>
                <p class="js-task-remain">Completed: ${completedTodos.length}</p>
            </div>

            <div class="todoList scroll"> ` 
                + generateTodoItems(todoList)  +

            `
            </div>
            <div href="" class="openBtn" onclick='openTodo(${i})'>
                <p>Open</p>
            </div>
        </div>`;
    })

    todoCardList.innerHTML = displayText;
}

function generateTodoItems(list) {
    let displayText = '';
    if (list.length === 0) {
        displayText = "<h2 class='empty-text'> No Item yet </h2>"
    }else{
        list.forEach((todoItem)=>{
            displayText += 
            `
                <div class="todoItem">
                    <div class="badge ${getPriority(todoItem.priority)}"></div>
                    <div class="section2">
                        <div class="todoHead">
                            <p class="todoTitle">${todoItem.title}</p>
                            ${
                                todoItem.status === 'completed' 
                                ? '<img src="images/like.png" alt="like image" width="16" height="16">'
                                : ''
                            }
                        </div>
                        <div class="todoBody">
                            <p class="todoDesc">
                                ${todoItem.desc}
                            </p>
                            <input type="checkbox" ${todoItem.status === 'completed'? 'checked' : ''} disabled>
                        </div>
                    </div>
                </div>
            `
        })
    }
    return displayText;
}