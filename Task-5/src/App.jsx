import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import Toolbar from './components/Toolbar/Toolbar'
import TaskTable from './components/TaskTable/TaskTable'
import AddTaskModal from './components/AddTaskModal/AddTaskModal'
import StatsBar from './components/StatsBar/StatsBar'
import './App.css'

function App() {

  // load tasks from localStorage if they exist
  var savedTasks = localStorage.getItem('tasks')
  var initialTasks = savedTasks ? JSON.parse(savedTasks) : [
    { id: 1, key: 'TSK-01', name: 'Usability Testing',     status: 'inprogress' },
    { id: 2, key: 'TSK-02', name: 'Conduct User Research', status: 'inprogress' },
    { id: 3, key: 'TSK-03', name: 'Develop User Stories',  status: 'todo' },
    { id: 4, key: 'TSK-04', name: 'Interactive Prototype', status: 'todo' },
    { id: 5, key: 'TSK-05', name: 'Design System Setup',   status: 'done' }
  ]

  // load user from localStorage if it exists
  var savedUser = localStorage.getItem('user')
  var initialUser = savedUser ? JSON.parse(savedUser) : { firstName: 'James', lastName: 'K', age: '' }

  var [tasks, setTasks]         = useState(initialTasks)
  var [user, setUser]           = useState(initialUser)
  var [activeTab, setActiveTab] = useState('all')
  var [search, setSearch]       = useState('')
  var [showModal, setShowModal] = useState(false)
  var [editingTask, setEditingTask] = useState(null)
  var [nextId, setNextId]       = useState(initialTasks.length + 1)
  var [isDark, setIsDark]       = useState(false)

  // filter by tab
  var filteredTasks = tasks
  if (activeTab != 'all') {
    filteredTasks = []
    for (var i = 0; i < tasks.length; i++) {
      if (tasks[i].status == activeTab) {
        filteredTasks.push(tasks[i])
      }
    }
  }

  // filter by search
  if (search != '') {
    var searchResult = []
    for (var i = 0; i < filteredTasks.length; i++) {
      if (filteredTasks[i].name.toLowerCase().includes(search.toLowerCase())) {
        searchResult.push(filteredTasks[i])
      }
    }
    filteredTasks = searchResult
  }

  // save tasks and update state
  function saveTasks(updatedTasks) {
    setTasks(updatedTasks)
    localStorage.setItem('tasks', JSON.stringify(updatedTasks))
  }

  // save user profile to localStorage
  function handleSaveUser(updatedUser) {
    setUser(updatedUser)
    localStorage.setItem('user', JSON.stringify(updatedUser))
  }

  function handleSave(data) {
    var updatedTasks = []
    if (editingTask) {
      // update existing task
      for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id == editingTask.id) {
          updatedTasks.push({ id: tasks[i].id, key: tasks[i].key, name: data.name, status: data.status })
        } else {
          updatedTasks.push(tasks[i])
        }
      }
    } else {
      // add new task
      var newKey = nextId < 10 ? 'TSK-0' + nextId : 'TSK-' + nextId
      updatedTasks = [...tasks, { id: nextId, key: newKey, name: data.name, status: data.status }]
      setNextId(nextId + 1)
    }
    saveTasks(updatedTasks)
    setShowModal(false)
    setEditingTask(null)
  }

  function handleDelete(id) {
    var updated = []
    for (var i = 0; i < tasks.length; i++) {
      if (tasks[i].id != id) {
        updated.push(tasks[i])
      }
    }
    saveTasks(updated)
  }

  function handleStatusChange(id, newStatus) {
    var updated = []
    for (var i = 0; i < tasks.length; i++) {
      if (tasks[i].id == id) {
        updated.push({ id: tasks[i].id, key: tasks[i].key, name: tasks[i].name, status: newStatus })
      } else {
        updated.push(tasks[i])
      }
    }
    saveTasks(updated)
  }

  function handleEdit(task) {
    setEditingTask(task)
    setShowModal(true)
  }

  return (
    <div className={isDark ? 'page dark-mode' : 'page'}>

      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        tasks={tasks}
        isDark={isDark}
        setIsDark={setIsDark}
        user={user}
        onSaveUser={handleSaveUser}
      />

      <div className="card">
        <StatsBar tasks={tasks} />

        <Toolbar
          search={search}
          onSearchChange={setSearch}
          taskCount={filteredTasks.length}
          onAddTask={function() { setEditingTask(null); setShowModal(true) }}
        />

        <TaskTable
          tasks={filteredTasks}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onStatusChange={handleStatusChange}
        />
      </div>

      {showModal && (
        <AddTaskModal
          onClose={function() { setShowModal(false); setEditingTask(null) }}
          onSave={handleSave}
          editingTask={editingTask}
        />
      )}

    </div>
  )
}

export default App
