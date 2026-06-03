import React from 'react'
import TaskRow from '../TaskRow/TaskRow'
import './TaskTable.css'

function TaskTable({ tasks, onEdit, onDelete, onStatusChange }) {

  // show message if no tasks
  if (tasks.length == 0) {
    return (
      <div className="table-wrapper">
        <div className="empty-state">
          <p className="empty-text">No tasks here</p>
          <p className="empty-sub">Add a new task to get started</p>
        </div>
      </div>
    )
  }

  return (
    <div className="table-wrapper">
      <table className="task-table">
        <thead>
          <tr>
            <th>Key</th>
            <th>Name</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(function(task) {
            return (
              <TaskRow
                key={task.id}
                task={task}
                onEdit={onEdit}
                onDelete={onDelete}
                onStatusChange={onStatusChange}
              />
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default TaskTable
