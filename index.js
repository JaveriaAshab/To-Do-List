const input = document.querySelector("input");
const addbutton = document.querySelector(".add-button");
const todohtml = document.querySelector(".todos");
const img = document.querySelector(".png-img");
let todoJson = JSON.parse(localStorage.getItem("todos")) || [];
const deleteAllButton = document.querySelector(".delete-all");
const filters = document.querySelectorAll(".filter");
let filter = '';

showToDo();

function getToDoHTML(todo, index){
    if (filter && filter != todo.status){
        return;
    }
    let checked = todo.status == "completed" ? "checked" : "";
    return `
    <li class="todo">
    <label for="${index}">
    <input id="${index}" onclick="UpdateStatus(this)" type="checkbox" ${checked}>
    <span class="${checked}">${todo.name}</span>
    </label>
    <button class="delete-btn" data-index="${index}" onclick="remove(this)"><i class="fa fa-times"></i></button>
    </li>
    `;
}
function showToDo(){
    if (todoJson.length == 0){
        todohtml.innerHTML = '';
        img.style.display = 'block';
    }
    else{
        todohtml.innerHTML = todoJson.map(getToDoHTML).join('');
        img.style.display = 'none';
    }
}
function addToDo(todo){
    input.value = "";
    todoJson.unshift({ name: todo, status: "pending" });
    localStorage.setItem("todos", JSON.stringify(todoJson));
    showToDo();
}
input.addEventListener("keyup", e => {
    let todo = input.value.trim();
    if (!todo || e.key != "Enter"){
        return;
    }
    addToDo(todo);
})
addbutton.addEventListener("click", () => {
    let todo = input.value.trim();
    if (!todo){
        return;
    }
    addToDo(todo);
})
function UpdateStatus(todo){
    let todoname = todo.parentElement.lastElementChild;
    if (todo.checked){
        todoname.classList.add("checked");
        todoJson[todo.id].status = "completed";
    }
    else{
        todoname.classList.remove("checked");
        todoJson[todo.id].status = "pending";
    }
    localStorage.setItem("todos", JSON.stringify(todoJson));
}
function remove(todo){
    const index = todo.dataset.index;
    todoJson.splice(index, 1);
    showToDo();
    localStorage.setItem("todos", JSON.stringify(todoJson));
}
Array.from(filters).forEach(function (el) {
    el.addEventListener("click", (e) => {
        if (el.classList.contains('active')) {
            el.classList.remove('active');
            filter = '';
        } else {
            Array.from(filters).forEach(tag => tag.classList.remove('active'));
            el.classList.add('active');
            filter = e.target.dataset.filter;
        }
        showToDo();
    });
});
deleteAllButton.addEventListener("click", () => {
    todoJson = [];
    localStorage.setItem("todos", JSON.stringify(todoJson));
    showToDo();
})