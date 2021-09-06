// clear warnings
var clearTaskInput = document.getElementById("taskInput");
clearTaskInput.addEventListener("click",clearTaskInputFunc)

function clearTaskInputFunc() {
    document.getElementById("inputWarning").style.display = "none";
    document.getElementById("completedWarning").style.display = "none";
    document.getElementById("emptyWarning").style.display = "none";
    document.getElementById("saveWarning").style.display = "none";
    document.getElementById("noTaskWarning").style.display = "none";
}


// add task button
var addTask = document.getElementById("addTask");
addTask.addEventListener("click", addTaskFunc)

function addTaskFunc() {

    clearTaskInputFunc();
    // alert("works!"); 
    var taskText = taskInput.value;
    if(taskText == "") {
        document.getElementById("inputWarning").style.display = "inline-block";
        document.getElementById("inputWarning").innerHTML = "New task can't be empty.";
    } else {
        newTaskItem(taskText, false);
    }
}

// clear completed  task button
var clearTask = document.getElementById("clearTask");
clearTask.addEventListener("click", clearTaskFunc);

function clearTaskFunc() {

    clearTaskInputFunc();
    // alert("works!");
    document.getElementById("completedWarning").style.display = "none";
    if(taskList.children.length == 0) {
        document.getElementById("completedWarning").style.display = "inline-block";
        document.getElementById("completedWarning").innerHTML = "No tasks to clear, add a task first.";
    }
    
    clearCompletedTask();

    // var taskItems = taskList.children;
    // for (var i = 0; i < taskList.children.length; i++) {
    //     if(taskItems[i].classList.contains("completed")) {
    //         clearCompletedTask();
    //     } else {
    //         document.getElementById("completedWarning").style.display = "inline-block";
    //         document.getElementById("completedWarning").innerHTML = "No completed task to clear, complete a task first";
    //     }
    // }
    
}

// empty task list button
var emptyList = document.getElementById("emptyList");
emptyList.addEventListener("click", emptyListFunc);

function emptyListFunc() {

    clearTaskInputFunc();
    // alert("works!");
    if(taskList.children.length == 0) {
        document.getElementById("emptyWarning").style.display = "inline-block";
        document.getElementById("emptyWarning").innerHTML = "Your task list is alredy empty.";
    }   
    clearTaskList();
}

// save task list button
var saveList = document.getElementById("saveList");
saveList.addEventListener("click", saveListFunc)

function saveListFunc() {
    
    clearTaskInputFunc();
    // alert("works!")
    saveTaskList();

}
// save task list button
var loadList = document.getElementById("loadList");
loadList.addEventListener("click", loadListFunc)

function loadListFunc() {
    
    clearTaskInputFunc();
    // alert("works!")
    // clearTaskList();
    loadTaskList();
}

// adding task to the ordered list
var taskInput = document.getElementById("taskInput");
var taskList = document.getElementById("taskList");

function newTaskItem(taskText, completed) {
    var listItem = document.createElement("li");
    var listItemText = document.createTextNode(taskText);

    listItem.appendChild(listItemText);

    if (completed) {
        listItem.classList.add("completed")
    }
    taskList.appendChild(listItem);
    listItem.addEventListener("dblclick", toggleTaskState)
}

// toggle task completion status
function toggleTaskState() {
    if (this.classList.contains("completed")) {
        this.classList.remove("completed");
    } else {
        this.classList.add("completed");
    }
}

// delete completed task from the list
function clearCompletedTask() {
    var completedTask = document.getElementsByClassName("completed");

    while( completedTask.length > 0) {
        completedTask.item(0).remove();
    }
}

// delete all tasks from task list
function clearTaskList() {
    var taskItems = taskList.children;
    while (taskItems.length > 0) {
        taskItems.item(0).remove();
    }
}

// saev task list
function saveTaskList() {
    var tasks = [];
    // console.log(this.taskList);
    if (taskList.children.length == 0) {
       // alert("ok");
        document.getElementById("saveWarning").style.display = "inline-block";
        document.getElementById("saveWarning").innerHTML = "No tasks to save, add a tasks first."
        return false;
    } 

    for(var i = 0; i < taskList.children.length; i++) {
        var task = taskList.children.item(i);

        var taskInfo = {
            "task": task.innerText,
            "compeleted": task.classList.contains("completed")
        }   

        tasks.push(taskInfo);
    }
    console.log(this.JSON.stringify(tasks));
    localStorage.setItem("tasks",JSON.stringify(tasks));

}

// load task list
function loadTaskList() {
    if (localStorage.getItem("tasks") != null) {
        var tasks = JSON.parse(localStorage.getItem("tasks"));

        for( i = 0; i < tasks.length; i++) {
            var task = tasks[i];
            newTaskItem(task.task, task.compeleted);
        }
    } else {
        document.getElementById("noTaskWarning").style.display = "inline-block";
        document.getElementById("noTaskWarning").innerHTML = "No tasks to load, save a tasks first.";
        // alert("well");
    }
}



