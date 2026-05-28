function addTask() {
  var input = document.getElementById("taskInput");
  var task = input.value;

  if (task == "") {
    alert("please type something");
    return;
  }

  var list = document.getElementById("taskList");
  var li = document.createElement("li");

  var span = document.createElement("span");
  span.innerText = task;
  li.appendChild(span);

  // edit button
  var editBtn = document.createElement("button");
  editBtn.innerText = "Edit";
  editBtn.className = "edit-btn";
  editBtn.onclick = function() {
    var newTask = prompt("Edit your task", span.innerText);
    if (newTask != null && newTask != "") {
      span.innerText = newTask;
    }
  }

  // delete button
  var deleteBtn = document.createElement("button");
  deleteBtn.innerText = "Delete";
  deleteBtn.className = "delete-btn";
  deleteBtn.onclick = function() {
    list.removeChild(li);
  }

  li.appendChild(editBtn);
  li.appendChild(deleteBtn);
  list.appendChild(li);

  input.value = "";

}