class Todo {
    constructor(title, dueDate, desc, status, priority) {
        this.title = title;
        this.desc = desc;
        this.dueDate = dueDate;
        this.status = status || 'uncompleted';
        this.priority = priority;
    }
}

function getPriority(rank) {
    if(rank == 1){
        return 'red';
    } else if(rank == 2){
        return 'blue';
    }else{
        return 'green';
    }
}