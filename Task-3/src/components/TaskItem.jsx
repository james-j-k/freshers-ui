import React, { useState } from 'react'

function TaskItem({ task, onDelete, onEdit }) {
  var [isEditing, setIsEditing] = useState(false)
  var [editValue, setEditValue] = useState(task.text)

  function handleSave() {
    if (editValue != '') {
      onEdit(task.id, editValue)
      setIsEditing(false)
    }
  }

  return (
    <li className="task-item">
      {isEditing ? (
        <input
          className="edit-input"
          value={editValue}
          onChange={function(e) { setEditValue(e.target.value) }}
        />
      ) : (
        <span className="task-text">{task.text}</span>
      )}

      <div className="buttons">
        {isEditing ? (
          <button className="edit-btn" onClick={handleSave}>Save</button>
        ) : (
          <button className="edit-btn" onClick={function() { setIsEditing(true) }}>Edit</button>
        )}
        <button className="delete-btn" onClick={function() { onDelete(task.id) }}>Delete</button>
      </div>
    </li>
  )
}

export default TaskItem
