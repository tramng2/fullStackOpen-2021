import React, {useState} from 'react'

function SearchFilter({persons, handleFilter}) {
   
    return (
        <div> filter shown with:
        <input 
        onChange={handleFilter}
        name="filter"
        />
      </div>
    )
}

export default SearchFilter
