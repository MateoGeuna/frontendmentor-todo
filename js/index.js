/**
 * Un tarea, va a estar compuesta por:
 *  - ID: numero unico que la identifica
 *  - Description: texto de la tarea en si
 *  - isCompleted: booleano que indica si la tarea fue completada
 */
const newTaskInput = document.getElementById("text-input");
const checkedCheckbox = document.getElementById("new-task-checkbox");


newTaskInput.addEventListener("keyup", function (e) {
    var keycode = e.keyCode || e.which;
    if (keycode == 13) {
        addNewTask();
    }
});

checkedCheckbox.addEventListener("click", function () {
    addNewTask();
})

function addNewTask() {
    const str = newTaskInput.value;
    const str2 = str.charAt(0).toUpperCase() + str.slice(1);
    const newId = taskList.length > 0 ? taskList[taskList.length - 1].id + 1 : 1;
    if (str2.trim() !== "") {
        taskList.push({
            id: newId,
            description: str2,
            isCompleted: false,
        })
    }

    newTaskInput.value = "";
    showTaskList('all');
};

/**
 * 
 * @param {string} type ['all' | 'completed' | 'no-completed']
 */
function showTaskList(type) {
    document.getElementById("container-items").innerHTML = "";
    for (let task of taskList) {
        if(type === 'completed' && !task.isCompleted) {
            continue;
        }
        if(type === 'no-completed' && task.isCompleted) {
            continue;
        }
        document.getElementById("container-items").innerHTML += `
            <div id="item-task-${task.id}" class="new-task item-task ${task.isCompleted ? 'item-task-checked' : ''}">
                <div class="div-checkbox">
                    <input type="checkbox" onchange="changeListCheck(${task.id})" class="task-checkbox" ${task.isCompleted ? 'checked' : ''} />
                </div>
                <div class="div-input">
                    <p>${task.description}</p>
                </div>
                <div onclick="deleteTask(${task.id})" class="cross">
                    <img src="./images/icon-cross.svg" alt="cruz"/>
                </div>
            </div>
        `;
    }
    updateItemsLeft();
    changeColorItems(type);
}

showTaskList('all');

function changeListCheck(id) {
    let checkBoxChecked = document.getElementById(`item-task-${id}`);
    checkBoxChecked.classList.toggle("item-task-checked");
    const findTask = taskList.find(task => task.id == id);
    findTask.isCompleted = !findTask.isCompleted;
    updateItemsLeft();
}


function deleteTask(id) {
    let findTask = taskList.findIndex(task => task.id == id);
    taskList.splice(findTask, 1);
    document.getElementById(`item-task-${id}`).remove();
    updateItemsLeft();
}

function updateItemsLeft () {
    let count = 0;
    for (const task2 of taskList) {
        if (!task2.isCompleted) {
            count++;
        }
    }
    document.getElementById("items-left").innerHTML = count;
}

function clearCompleted() {
    let newCompletedDelete = [];
    for (const task of taskList) {
        if (task.isCompleted) {
            newCompletedDelete.push(task.id);
        }
    }
    
    for (const id of newCompletedDelete) {
        deleteTask(id);
    }
}


// Desarrollar una función que reciba un parámetro (type)
    // el parametro type podra tomar los valores "all", "completed" y "no-completed"
// La funcion en primer lugar eliminará la clase "filter-active" de los elementos "item-option-filter"
// Luego agregara la clase "filter-active" al elemento con id "item-option-filter-[type]"
function changeColorItems(type) {
    const optFilterAll = document.getElementById('item-option-filter-all');
    const optFilterCompleted = document.getElementById('item-option-filter-completed');
    const optFilterNoCompleted = document.getElementById('item-option-filter-no-completed');

    optFilterAll.classList.remove('filter-active');
    optFilterCompleted.classList.remove('filter-active');
    optFilterNoCompleted.classList.remove('filter-active');

    if(type === 'completed') {
        optFilterCompleted.classList.add('filter-active');
    } else if (type === 'no-completed') {
        optFilterNoCompleted.classList.add('filter-active');
    } else {
        optFilterAll.classList.add('filter-active');
    }
}

