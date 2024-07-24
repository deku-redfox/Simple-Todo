/**
 *  Variables (Contain all the todos)
 */
let allTodos = [];


/**
 *  Init Running Functions
 */
getAllTodos();


/**
 *  Functions
 */
function getAllTodos() {
    let jsonTodoList;
    let i = 0;

    while (jsonTodoList = localStorage.getItem(i)) {

        console.log(jsonTodoList)
        const todoList = JSON.parse(jsonTodoList);
        allTodos.push(todoList);
        console.log(todoList)
        i++;

    }
    console.log(allTodos);
}

function deleteAllTodos() {
    allTodos.forEach(item => {
        localStorage.removeItem(`${item.id}`)
    })
}