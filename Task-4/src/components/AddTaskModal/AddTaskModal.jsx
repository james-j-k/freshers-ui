import React, { useState } from 'react'
import './AddTaskModal.css'

function AddTaskModal({ onClose, onSave, editingTask }) {

  var [taskName, setTaskName] = useState(editingTask ? editingTask.name : '')
  var [taskStatus, setTaskStatus] = useState(editingTask ? editingTask.status : 'todo')
  var [error, setError] = useState('')

  function handleSave() {
    // check if name is empty
    if (taskName.trim() == '') {
      setError('Please enter a task name')
      return
    }
    onSave({ name: taskName.trim(), status: taskStatus })
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={function(e) { e.stopPropagation() }}>

        <div className="modal-header">
          <h2 className="modal-title">{editingTask ? 'Edit Task' : 'New Task'}</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        {/* task name input */}
        <div className="modal-field">
          <label>Task name</label>
          <input
            type="text"
            placeholder="Enter task name"
            value={taskName}
            onChange={function(e) { setTaskName(e.target.value); setError('') }}
            onKeyDown={function(e) { if (e.key == 'Enter') handleSave() }}
            autoFocus
          />
          {error != '' && <span className="field-error">{error}</span>}
        </div>

        {/* status picker */}
        <div className="modal-field">
          <label>Status</label>
          <div className="status-options">
            <div
              className={taskStatus == 'todo' ? 'status-option selected' : 'status-option'}
              onClick={function() { setTaskStatus('todo') }}
            >
              To Do
            </div>
            <div
              className={taskStatus == 'inprogress' ? 'status-option selected' : 'status-option'}
              onClick={function() { setTaskStatus('inprogress') }}
            >
              In Progress
            </div>
            <div
              className={taskStatus == 'done' ? 'status-option selected' : 'status-option'}
              onClick={function() { setTaskStatus('done') }}
            >
              Done
            </div>
          </div>
        </div>

        <div className="modal-buttons">
          <button className="cancel-btn" onClick={onClose}>Cancel</button>
          <button className="save-btn" onClick={handleSave}>
            {editingTask ? 'Save changes' : 'Add task'}
          </button>
        </div>

      </div>
    </div>
  )
}

export default AddTaskModal
