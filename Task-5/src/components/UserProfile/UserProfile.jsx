import React, { useState } from 'react'
import './UserProfile.css'

function UserProfile({ user, onSave }) {

  var [isOpen, setIsOpen] = useState(false)
  var [firstName, setFirstName] = useState(user.firstName)
  var [lastName, setLastName] = useState(user.lastName)
  var [age, setAge] = useState(user.age)
  var [error, setError] = useState('')

  // get first letter of first and last name
  var initials = user.firstName.charAt(0).toUpperCase() + user.lastName.charAt(0).toUpperCase()

  function handleSave() {
    if (firstName.trim() == '') {
      setError('First name cannot be empty')
      return
    }
    onSave({ firstName: firstName.trim(), lastName: lastName.trim(), age: age })
    setIsOpen(false)
    setError('')
  }

  function handleClose() {
    // reset to saved values when closing without saving
    setFirstName(user.firstName)
    setLastName(user.lastName)
    setAge(user.age)
    setError('')
    setIsOpen(false)
  }

  return (
    <div className="user-profile">

      {/* avatar button */}
      <div className="user-btn" onClick={function() { setIsOpen(!isOpen) }}>
        <div className="avatar-circle">{initials}</div>
        <span className="user-firstname">{user.firstName}</span>
      </div>

      {/* dropdown panel */}
      {isOpen && (
        <div className="profile-dropdown">
          <div className="dropdown-header">
            <div className="dropdown-avatar">{initials}</div>
            <div>
              <p className="dropdown-name">{user.firstName} {user.lastName}</p>
              {user.age != '' && <p className="dropdown-age">Age {user.age}</p>}
            </div>
          </div>

          <div className="dropdown-divider"></div>

          <div className="dropdown-field">
            <label>First name</label>
            <input
              type="text"
              value={firstName}
              onChange={function(e) { setFirstName(e.target.value); setError('') }}
            />
          </div>

          <div className="dropdown-field">
            <label>Last name</label>
            <input
              type="text"
              value={lastName}
              onChange={function(e) { setLastName(e.target.value) }}
            />
          </div>

          <div className="dropdown-field">
            <label>Age</label>
            <input
              type="number"
              value={age}
              onChange={function(e) { setAge(e.target.value) }}
              placeholder="optional"
            />
          </div>

          {error != '' && <p className="dropdown-error">{error}</p>}

          <div className="dropdown-buttons">
            <button className="dropdown-cancel" onClick={handleClose}>Cancel</button>
            <button className="dropdown-save" onClick={handleSave}>Save</button>
          </div>
        </div>
      )}

      {/* close when clicking outside */}
      {isOpen && <div className="dropdown-backdrop" onClick={handleClose}></div>}

    </div>
  )
}

export default UserProfile
