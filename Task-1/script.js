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

  // button wrapper
  var btnDiv = document.createElement("div");
  btnDiv.className = "buttons";

  // edit button
  var editBtn = document.createElement("button");
  editBtn.innerText = "Edit";
  editBtn.className = "edit-btn";
  editBtn.onclick = function() {

    // replace span with input box
    var editInput = document.createElement("input");
    editInput.value = span.innerText;
    editInput.className = "edit-input";
    li.replaceChild(editInput, span);

    // change edit button to save
    editBtn.innerText = "Save";
    editBtn.onclick = function() {
      if (editInput.value != "") {
        span.innerText = editInput.value;
        li.replaceChild(span, editInput);
        editBtn.innerText = "Edit";
        editBtn.onclick = arguments.callee.caller;
      }
    }

  }

  // delete button
  var deleteBtn = document.createElement("button");
  deleteBtn.innerText = "Delete";
  deleteBtn.className = "delete-btn";
  deleteBtn.onclick = function() {
    list.removeChild(li);
  }

  btnDiv.appendChild(editBtn);
  btnDiv.appendChild(deleteBtn);
  li.appendChild(btnDiv);
  list.appendChild(li);

  input.value = "";

}
