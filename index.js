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
const tasksCollection = document.querySelector('.collection');

//Further need to create a function will be load all events

loadEventListeners();

function loadEventListeners () {
    form.addEventListener('submit', addTask);
}

//Need to create the function for add tasks
function addTask (e) {
    if (newTaskInput.value === "") {
        alert('Add task please')
    }
   const li = document.createElement('li');
   li.className = 'collection-item';

   li.appendChild(document.createTextNode(newTaskInput.value));

   tasksCollection.appendChild(li);

   const link = document.createElement('a');
   link.className = 'delete-item secondary-content';
   link.innerHTML = '<i class="fa fa-times" aria-hidden="true"></i>';
   // link.innerHTML = '<i class="material-icons"></i>';
   li.appendChild(link);

   //Clear newTaskInput
    newTaskInput.value = '';

    e.preventDefault();
}


// console.log(form, newTaskInput, filterInput, clearTaskBtn, task);
