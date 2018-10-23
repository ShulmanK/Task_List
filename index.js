// define UI vars
//Working with the form
const form = document.querySelector('form');
//Working with area of input
const newTaskInput = document.getElementById('task');
//Working with filter area input
const filterInput = document.getElementById('filter');
//Working with clear tasks button
const clearTaskBtn = document.querySelector(('.clear-tasks'));
//Working with ul element for building li
const taskCollection = document.querySelector('.collection');

//Further need to create a function will be load all events

loadEventListeners();

function loadEventListeners () {
    //DOM load event
    document.addEventListener('DOMContentLoaded', getTask);
    form.addEventListener('submit', addTask);
    taskCollection.addEventListener('click', removeTask);
    clearTaskBtn.addEventListener('click', clearTasks);
    filterInput.addEventListener('keyup', filterTask);

}

function getTask(){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task){
        const li = document.createElement('li');
        li.className = 'collection-item';

        li.appendChild(document.createTextNode(task));

        taskCollection.appendChild(li);

        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';
        link.innerHTML = '<i class="fa fa-times" aria-hidden="true"></i>';
        // link.innerHTML = '<i class="material-icons"></i>';
        li.appendChild(link);
    })
}

//Need to create the function for add tasks
function addTask (e) {
    if (newTaskInput.value === "") {
        alert('Add task please');
        return
    } else {

   const li = document.createElement('li');
   li.className = 'collection-item';

   li.appendChild(document.createTextNode(newTaskInput.value));

   taskCollection.appendChild(li);

   const link = document.createElement('a');
   link.className = 'delete-item secondary-content';
   link.innerHTML = '<i class="fa fa-times" aria-hidden="true"></i>';
   // link.innerHTML = '<i class="material-icons"></i>';
   li.appendChild(link);

   //Store in LS
   storeTaskInLocalStorage(newTaskInput.value);



   //Clear newTaskInput
    newTaskInput.value = '';

    e.preventDefault();

    }
}

//Store task

function storeTaskInLocalStorage(task) {
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks))

}
//Create function removeTask

function removeTask (e) {
    if (e.target.parentElement.classList.contains('delete-item')) {
        if (confirm('Are you sure?')) {
        e.target.parentElement.parentElement.remove();
        //Remove task from local storage
        removeTaskFromLocalStorage(e.target.parentElement.parentElement);

        }
    }
}

//Remove from LS
function removeTaskFromLocalStorage(taskItem){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task, index){
        if(taskItem.textContent === task){
            tasks.splice(index, 1);
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));

}

//Clear tasks

//One way
function clearTasks (e) {
//     taskCollection.innerHTML = '';
//     console.log(e);
//
//Other way/faster

while(taskCollection.firstChild) {
    taskCollection.removeChild(taskCollection.lastChild);
}

//Clear from LS
    clearTasksFromLocalStorage();
}


function clearTasksFromLocalStorage(){
    localStorage.clear();
    
}
// Filter task

function filterTask (e) {
    const text = e.target.value.toLowerCase();
    console.log('Поле фильтра' + text);

    document.querySelectorAll('.collection-item').forEach(function (task) {
        const item = task.firstChild.textContent;
        if (item.toLowerCase().indexOf(text) != -1){
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
        console.log(item.toLowerCase().indexOf(text));

        // item.toLowerCase().indexOf(text);
    });



    // document.querySelectorAll('.delete-item').forEach(function(task){
    //     alert(task);
    //     }
};

    // console.log(text);

// }
// console.log(form, newTaskInput, filterInput, clearTaskBtn, task);

// document.querySelectorAll('.collection-item').forEach(function(task){
//     console.log(task.firstChild);
// });
