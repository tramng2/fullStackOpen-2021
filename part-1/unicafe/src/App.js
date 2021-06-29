import React, { useState, useEffect } from 'react'
import Statistics from './components/Statistics'
import Button from './components/Button'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)

  useEffect(() => {
    const result = ((good * 1) + (bad * -1) + (neutral * 0)) / (bad + good + neutral)
    setAverage(result)
  }, [good, neutral, bad])

  useEffect(() => {
    const result = good * 100 / (bad + good + neutral)
    setPositive(result)
  }, [good, bad, neutral])

  const handleGood = () => {
    setGood(good + 1)
  }
  const handleBad = () => {
    setBad(bad + 1)
  }
  const handleNeutral = () => {
    setNeutral(neutral + 1)
  }

  return (
    <div>
      <h1>Give feedback</h1>

      <Button
        handleBad={handleBad}
        handleGood={handleGood}
        handleNeutral={handleNeutral}
      />
      <h1>Statistics</h1>
      <Statistics good={good} bad={bad} neutral={neutral} average={average} positive={positive} />
    </div>
  )
}

export default App