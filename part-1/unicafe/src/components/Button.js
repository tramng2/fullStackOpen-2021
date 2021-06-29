import React from 'react'

function Button({handleGood, handleBad, handleNeutral}) {
    return (
        <div>
            <button onClick={() => handleGood()}>good</button>
            <button onClick={() => handleBad()}>neutral</button>
            <button onClick={() => handleNeutral()}>bad</button>
        </div>
    )
}

export default Button
