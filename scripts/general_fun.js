/** Functions that we will use in multiple Codes */

    // Overlays and Dialogs
function openDialog(overlay, message, action) {
    document.querySelector(overlay).classList.add('active')
    if (message) {
        document.querySelector('.js-dialog-message').innerHTML = message;
    }
    if (action) {
        document.querySelector('.js-confirm').onclick = action;
    }
}

function closeDialog(overlay) {
    document.querySelector(overlay).classList.remove('active')
}

    // Sort Items
function sortItems(sortType, listItem, itemType = 'todoList') {
    let array = listItem;
    if (itemType === 'todoList') {

        if (sortType === 'length') {
            listItem.sort((a, b) => a.todoList.length - b.todoList.length);

        }else if (sortType === 'nameAsc') {
            listItem.sort((a, b) => a.name.localeCompare(b.name));

        } else{
            listItem.sort((a, b) => a.name.localeCompare(b.name) * -1);

        }

    }else{

        if (sortType === 'nameAsc') {
            listItem.sort((a, b) => a.title.localeCompare(b.title));

        } else if (sortType === 'nameDesc'){
            listItem.sort((a, b) => a.title.localeCompare(b.title) * -1);

        } else {
            listItem.sort((a, b) => a.priority - b.priority);

        }
    }

    return listItem;
}

    // Navigation to pages
function getPage(url) {
    window.location.href = url;
}