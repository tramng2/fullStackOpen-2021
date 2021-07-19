import React from 'react'

function PersonForm({addPerson, handleChange, newPerson}) {
    
    return (
        <form onSubmit={addPerson}>
        <div> name:
          <input
            onChange={handleChange}
            value={newPerson.name}
            name="name"
          />
        </div>
        <div> number:
          <input
            onChange={handleChange}
            value={newPerson.number}
            name="number"
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}

export default PersonForm
