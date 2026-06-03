import React from 'react'
import './Toolbar.css'

function Toolbar({ search, onSearchChange, taskCount, onAddTask }) {
  return (
    <div className="toolbar">

      {/* search input */}
      <div className="search-box">
        <span>🔍</span>
        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={function(e) { onSearchChange(e.target.value) }}
        />
        {search != '' && (
          <button className="clear-search" onClick={function() { onSearchChange('') }}>✕</button>
        )}
      </div>

      <div className="toolbar-right">
        <span className="task-count-label">{taskCount} tasks</span>
        <button className="add-btn" onClick={onAddTask}>+ Add task</button>
      </div>

    </div>
  )
}

export default Toolbar
