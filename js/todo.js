const todoForm = document.querySelector(".todo_input");
const todoInput = todoForm.querySelector("input");
const todo = document.querySelector(".todos");
const finish = document.querySelector(".finishs");

let toDos = [];
let finishs = [];
let id_num = 1;

function saveToDo() {
    localStorage.setItem("toDos", JSON.stringify(toDos));
}

function saveFinish() {
    localStorage.setItem("finishs", JSON.stringify(finishs));
}

function removeToDo(event) {
    const btn = event.target;
    const btns = btn.parentNode;
    const column = btns.parentNode;
    todo.removeChild(column);
    const cleanToDos = toDos.filter(function(obj) {
        return obj.id != parseInt(column.id);
    });
    toDos = cleanToDos;
    saveToDo();
}

function removeFinish(event) {
    const btn = event.target;
    const btns = btn.parentNode;
    const column = btns.parentNode;
    finish.removeChild(column);
    const cleanFinishs = finishs.filter(function(obj) {
        return obj.id != parseInt(column.id);
    });
    finishs = cleanFinishs;
    saveFinish();
}

function moveFinish(event) {
    const btn = event.target;
    const btns = btn.parentNode;
    const column = btns.parentNode;
    const text = column.querySelector("span");
    paintFinish(text.innerText);
}

function moveToDo(event) {
    const btn = event.target;
    const btns = btn.parentNode;
    const column = btns.parentNode;
    const text = column.querySelector("span");
    paintToDo(text.innerText);
}

function paintToDo(text) {
    const column = document.createElement("div");
    const content = document.createElement("span");
    const btns = document.createElement("div");
    const delBtn = document.createElement("button");
    const checkBtn = document.createElement("button");

    delBtn.addEventListener("click", removeToDo);
    checkBtn.addEventListener("click", removeToDo);
    checkBtn.addEventListener("click", moveFinish);

    content.innerText = text;
    delBtn.innerText = "❌";
    checkBtn.innerText = "✔";

    column.classList.add("column");
    btns.classList.add("column_btns");
    delBtn.classList.add("delBtn");
    checkBtn.classList.add("checkBtn");

    todo.appendChild(column);
    column.appendChild(content);
    column.appendChild(btns);
    column.id = id_num;
    btns.appendChild(delBtn);
    btns.appendChild(checkBtn);

    const toDoObj = {
        text: text,
        id: id_num++
    };

    toDos.push(toDoObj);
    saveToDo();
}

function paintFinish(text) {
    const column = document.createElement("div");
    const content = document.createElement("span");
    const btns = document.createElement("div");
    const delBtn = document.createElement("button");
    const checkBtn = document.createElement("button");

    delBtn.addEventListener("click", removeFinish);
    checkBtn.addEventListener("click", removeFinish);
    checkBtn.addEventListener("click", moveToDo);

    content.innerText = text;
    delBtn.innerText = "❌";
    checkBtn.innerText = "✔";

    column.classList.add("column");
    btns.classList.add("column_btns");
    delBtn.classList.add("delBtn");
    checkBtn.classList.add("checkBtn");

    finish.appendChild(column);
    column.appendChild(content);
    column.appendChild(btns);
    column.id = id_num;
    btns.appendChild(delBtn);
    btns.appendChild(checkBtn);

    const finishObj = {
        text: text,
        id: id_num++
    };

    finishs.push(finishObj);
    saveFinish();
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = todoInput.value;
    paintToDo(currentValue);
    todoInput.value = "";
}

function loadTodo() {
    const cur_toDos = localStorage.getItem("toDos");
    if(cur_toDos != null) {
        const parsedToDos = JSON.parse(cur_toDos);
        parsedToDos.forEach(function(obj) {
            paintToDo(obj.text);
        });
    }
}

function loadFinish() {
    const cur_finishs = localStorage.getItem("finishs");
    if(cur_finishs != null) {
        const parsedFinishs = JSON.parse(cur_finishs);
        parsedFinishs.forEach(function(obj) {
            paintFinish(obj.text);
        });
    }
}

function init() {
    todoForm.addEventListener("submit", handleSubmit);
    loadTodo();
    loadFinish();
}

init();