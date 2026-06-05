import React from 'react'
import UserProfile from '../UserProfile/UserProfile'
import './Navbar.css'

function Navbar({ activeTab, setActiveTab, tasks, isDark, setIsDark, user, onSaveUser }) {

  // count tasks for each tab
  var totalCount = tasks.length
  var inProgressCount = 0
  var todoCount = 0
  var doneCount = 0

  for (var i = 0; i < tasks.length; i++) {
    if (tasks[i].status == 'inprogress') inProgressCount++
    if (tasks[i].status == 'todo') todoCount++
    if (tasks[i].status == 'done') doneCount++
  }

  return (
    <div className="navbar">
      <span className="navbar-title">Tasks</span>

      {/* tab buttons */}
      <div className="nav-tabs">
        <button className={activeTab == 'all' ? 'nav-tab active' : 'nav-tab'} onClick={function() { setActiveTab('all') }}>
          All <span className="tab-count">{totalCount}</span>
        </button>
        <button className={activeTab == 'inprogress' ? 'nav-tab active' : 'nav-tab'} onClick={function() { setActiveTab('inprogress') }}>
          In Progress <span className="tab-count">{inProgressCount}</span>
        </button>
        <button className={activeTab == 'todo' ? 'nav-tab active' : 'nav-tab'} onClick={function() { setActiveTab('todo') }}>
          To Do <span className="tab-count">{todoCount}</span>
        </button>
        <button className={activeTab == 'done' ? 'nav-tab active' : 'nav-tab'} onClick={function() { setActiveTab('done') }}>
          Done <span className="tab-count">{doneCount}</span>
        </button>
      </div>

      {/* right side: theme toggle + user profile */}
      <div className="navbar-right">
        <div className="theme-toggle" onClick={function() { setIsDark(!isDark) }}>
          <div className={isDark ? 'toggle-track dark' : 'toggle-track'}>
            <span className="toggle-icon">{isDark ? '🌙' : '☀️'}</span>
          </div>
        </div>

        <UserProfile user={user} onSave={onSaveUser} />
      </div>
    </div>
  )
}

export default Navbar
