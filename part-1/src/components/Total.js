import React from 'react'

function Total({ parts }) {
    const result = parts.reduce((acc, curVal) => acc + curVal.exercises, 0)
    return (
        <div>
            <p>Number of exercises {result}</p>
        </div>
    )
}

export default Total
