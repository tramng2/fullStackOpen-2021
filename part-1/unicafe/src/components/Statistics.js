import React from 'react'
import Statistic from './Statistic'

function Statistics({ good, neutral, bad, average, positive }) {
    return (
        <table>
            {!average && !positive ?
                <tbody>
                    <tr>
                        <td>No feedback given</td>
                    </tr>
                </tbody>
                :
                <tbody>
                    <Statistic text="good" value={good} />
                    <Statistic text="neutral" value={neutral} />
                    <Statistic text="bad" value={bad} />
                    <Statistic text="average" value={average} />
                    <Statistic text="positive" value={positive} />
                </tbody>
            }
        </table>
    )
}

export default Statistics
