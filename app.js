// Define all vars
const form = document.querySelector('form')
const taskInput = document.querySelector('#task')
const filter = document.querySelector('#filter')
const taskList = document.querySelector('.collection')
const clearTask = document.querySelector('.clear-task')

// loadAllEventListeners
loadEventListeners()

function loadEventListeners() {
    // DOMContentLoaded
    document.addEventListener('DOMContentLoaded', saveTask)
    // add task event
    form.addEventListener('submit', addTask)
    // delete task event
    taskList.addEventListener('click', deleteTask)
    // filter task event
    filter.addEventListener('keyup', filterTask)
    // clear task event
    clearTask.addEventListener('click', clearAllTask)
}

 // DOMContentLoaded
  function saveTask(task) {
   let tasks;

   if (localStorage.getItem('tasks') === null) {
      tasks = []
   } else {
      tasks = JSON.parse(localStorage.getItem('tasks'))
   }

   tasks.forEach(function (task) {
      // create li element
    const listItem = document.createElement('li')
    // add classname
    listItem.className = 'collection-item'
    // textnode
    listItem.appendChild(document.createTextNode(task))
    // create link element
    const link = document.createElement('a')
    // add classname
    link.className = 'delete-item'
    // create img element and append to link
    const img = document.createElement('img')
    img.className = 'img'
    img.setAttribute('src', 'xmark-solid.svg')
    link.appendChild(img)
    // append link to listItem
    listItem.appendChild(link)
    // append listItem to taskList
    taskList.appendChild(listItem)
   })
   

   localStorage.setItem('tasks', JSON.stringify(tasks))
  }

 // add task event
 function addTask(e) {
    // create li element
    const listItem = document.createElement('li')
    // add classname
    listItem.className = 'collection-item'
    // textnode
    listItem.appendChild(document.createTextNode(taskInput.value))
    // create link element
    const link = document.createElement('a')
    // add classname
    link.className = 'delete-item'
    // create img element and append to link
    const img = document.createElement('img')
    img.className = 'img'
    img.setAttribute('src', 'xmark-solid.svg')
    link.appendChild(img)
    // append link to listItem
    listItem.appendChild(link)
    // append listItem to taskList
    taskList.appendChild(listItem)
    //store in LS
    storeInLocalStorage(taskInput.value)
    //clear input
    taskInput.value = ''
 }

 //store in LS
 function storeInLocalStorage(task) {
  
   let tasks;

   if (localStorage.getItem('tasks') === null) {
      tasks = []
   } else {
      tasks = JSON.parse(localStorage.getItem('tasks'))
   }

   tasks.push(task)

   localStorage.setItem('tasks', JSON.stringify(tasks))
 }

// delete task event
function deleteTask(e) {
   if (e.target.parentElement.className === 'delete-item') {
    e.target.parentElement.parentElement.remove()
    // deleteTaskFromLocalStorage
    deleteTaskFromLocalStorage( e.target.parentElement.parentElement)
   }
}
 // deleteTaskFromLocalStorage
   function deleteTaskFromLocalStorage(taskItem) {
      let tasks;

   if (localStorage.getItem('tasks') === null) {
      tasks = []
   } else {
      tasks = JSON.parse(localStorage.getItem('tasks'))
   }

   tasks.forEach(function (task, index) {
      if (taskItem.textContent === task) {
         tasks.splice(index, 1)
      }
   })

   localStorage.setItem('tasks', JSON.stringify(tasks))
   }

// filter task event

function filterTask(e) {
   const text = e.target.value.toLowerCase()

   document.querySelectorAll('.collection-item').forEach(function (task) {
      const item = task.firstChild.textContent;

      if (item.toLowerCase().indexOf(text) != -1) {
         task.style.display = 'block'
      } else {
         task.style.display = 'none'
      }
   })
}

// clear task event
function clearAllTask(task) {
   // taskList.innerHTML = '';
   while (taskList.firstChild) {
      taskList.removeChild(taskList.firstChild)
   }
   // clearTaskFromLocalStorage
   clearTaskFromLocalStorage()
}

 // clearTaskFromLocalStorage
 function clearTaskFromLocalStorage() {
   localStorage.clear()
 }











