import React from 'react'
import Part from './Part'

function Content({ parts }) {
    console.log(parts)
    return (
        <div>
            {parts.map((el, index) => <Part key={index} name={el.name} ex={el.exercises}/>)}
        </div>
    )
}

export default Content
