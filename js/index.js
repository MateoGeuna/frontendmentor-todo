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
    const newId = taskList.length > 0 ? taskList[taskList.length - 1].id + 1 : 1;
    if (newTaskInput.value.trim() !== "") {
        taskList.push({
            id: newId,
            description: newTaskInput.value,
            isCompleted: false,
        })
    }

    newTaskInput.value = "";
    showTaskList();
};

let taskList = [
    {
        id: 1,
        description: 'Complete online JavaScript course',
        isCompleted: true,
    },
    {
        id: 2,
        description: 'Jog around the park 3x',
        isCompleted: false,
    },
    {
        id: 3,
        description: '10 minutes meditation',
        isCompleted: false,
    },
    {
        id: 4,
        description: 'Read for 1 hour',
        isCompleted: false,
    },
    {
        id: 5,
        description: 'Pick up groceries',
        isCompleted: false,
    },
    {
        id: 6,
        description: 'Complete Todo App on Frontend Mentor',
        isCompleted: false,
    }
];


function showTaskList() {
    document.getElementById("container-items").innerHTML = "";
    for (let task of taskList) {
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
}

showTaskList();

function changeListCheck(id) {
    let checkBoxChecked = document.getElementById(`item-task-${id}`);
    checkBoxChecked.classList.toggle("item-task-checked");
    const findTask = taskList.find(task => task.id == id);
    findTask.isCompleted = !findTask.isCompleted;
}


function deleteTask(id) {
    let findTask = taskList.findIndex(task => task.id == id);
    taskList.splice(findTask, 1);
    document.getElementById(`item-task-${id}`).remove();
}

/*
const personaEliminar = 'p3';

const index = personas.findIndex( x => x.id === personaEliminar );

personas.splice( index, 1 );
console.log( personas ); 
 */