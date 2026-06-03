import React from 'react'
import './StatsBar.css'

function StatsBar({ tasks }) {

  // count each status
  var total = tasks.length
  var inProgress = 0
  var todo = 0
  var done = 0

  for (var i = 0; i < tasks.length; i++) {
    if (tasks[i].status == 'inprogress') inProgress++
    if (tasks[i].status == 'todo') todo++
    if (tasks[i].status == 'done') done++
  }

  return (
    <div className="stats-bar">
      <div className="stat-card stat-total">
        <span className="stat-number">{total}</span>
        <span className="stat-label">Total</span>
      </div>
      <div className="stat-card stat-inprogress">
        <span className="stat-number">{inProgress}</span>
        <span className="stat-label">In Progress</span>
      </div>
      <div className="stat-card stat-todo">
        <span className="stat-number">{todo}</span>
        <span className="stat-label">To Do</span>
      </div>
      <div className="stat-card stat-done">
        <span className="stat-number">{done}</span>
        <span className="stat-label">Done</span>
      </div>
    </div>
  )
}

export default StatsBar
