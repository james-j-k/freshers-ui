import React from 'react'
import './StatusBadge.css'

function StatusBadge({ status, onChange }) {
  return (
    <select
      className={'status-select status-' + status}
      value={status}
      onChange={function(e) { onChange(e.target.value) }}
    >
      <option value="todo">To Do</option>
      <option value="inprogress">In Progress</option>
      <option value="done">Done</option>
    </select>
  )
}

export default StatusBadge
