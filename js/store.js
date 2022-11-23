let taskList = getTaskListFromLocalStorage();

function getTaskListFromLocalStorage() {
    let taskList = localStorage.getItem('TASK_LIST');
    taskList = JSON.parse(taskList);
    if(taskList == null) {
        taskList = [];
    }
    return taskList;
}


function setTaskListFromLocalStorage(taskList) {
    taskList = JSON.stringify(taskList);
    localStorage.setItem('TASK_LIST', taskList);
}