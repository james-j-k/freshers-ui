import React from 'react'
import StatusBadge from '../StatusBadge/StatusBadge'
import './TaskRow.css'

function TaskRow({ task, onEdit, onDelete, onStatusChange }) {
  return (
    <tr className="task-row">
      <td className="task-key">{task.key}</td>
      <td className={task.status == 'done' ? 'task-name task-done' : 'task-name'}>{task.name}</td>
      <td>
        <StatusBadge
          status={task.status}
          onChange={function(newStatus) { onStatusChange(task.id, newStatus) }}
        />
      </td>
      <td>
        <div className="action-buttons">
          <button className="edit-btn" onClick={function() { onEdit(task) }}>Edit</button>
          <button className="delete-btn" onClick={function() { onDelete(task.id) }}>Delete</button>
        </div>
      </td>
    </tr>
  )
}

export default TaskRow
