import React from 'react'

function Statistic({ text, value }) {
    return (   
            <tr>
                <td>{text}</td>
                <td>{value}</td>
            </tr>
    )
}

export default Statistic
