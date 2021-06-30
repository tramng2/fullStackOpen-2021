import React from 'react'
import Part from './Part'
function Course({course}) {
    const total = course.parts.reduce((acc, cur) => acc + cur.exercises, 0)
    return (
        <div>
            <h1>{course.name}</h1>
            {course.parts.map(el => <Part key={el.id} text={el.name} ex={el.exercises}/>)}
            <h2>total of {total} exercises</h2>
        </div>
    )
}

export default Course
