import React, { useState } from 'react'
import TaskItem from './components/TaskItem'

function App() {
  var [tasks, setTasks] = useState([])
  var [taskInput, setTaskInput] = useState('')
  var [searchInput, setSearchInput] = useState('')
  var [error, setError] = useState('')

  function addTask() {
    if (taskInput.trim() == '') {
      setError('please type something!')
      return
    }
    var newTask = { id: Date.now(), text: taskInput.trim() }
    setTasks([...tasks, newTask])
    setTaskInput('')
    setError('')
  }

  function deleteTask(id) {
    var updated = tasks.filter(function(task) { return task.id != id })
    setTasks(updated)
  }

  function editTask(id, newText) {
    var updated = tasks.map(function(task) {
      if (task.id == id) {
        return { id: task.id, text: newText }
      }
      return task
    })
    setTasks(updated)
  }

  var filteredTasks = tasks.filter(function(task) {
    return task.text.toLowerCase().includes(searchInput.toLowerCase())
  })

  return (
    <div>

      {/* navbar */}
      <div className="navbar">
        <div className="logo">
          <span className="logo-box">T</span>
          <span className="logo-text">My Tasks</span>
        </div>
        <span className="user-name">James</span>
      </div>

      {/* main card */}
      <div className="container">
        <h1>Task List</h1>

        {/* add task */}
        <div className="input-section">
          <input
            type="text"
            placeholder="Enter task"
            value={taskInput}
            onChange={function(e) { setTaskInput(e.target.value); setError('') }}
          />
          <button onClick={addTask}>+ Add</button>
        </div>

        {error != '' && <p className="error-msg">{error}</p>}

        {/* task count */}
        <p className="task-count">{tasks.length} task{tasks.length != 1 ? 's' : ''} total</p>

        {/* list */}
        <ul>
          {filteredTasks.length == 0 ? (
            <p className="no-tasks">No tasks added yet</p>
          ) : (
            filteredTasks.map(function(task) {
              return (
                <TaskItem
                  key={task.id}
                  task={task}
                  onDelete={deleteTask}
                  onEdit={editTask}
                />
              )
            })
          )}
        </ul>
      </div>

    </div>
  )
}

export default App
