import React from 'react'

const Statistics = ({good, neutral, bad}) => {
  return (
    <>
      <h2>statistics</h2>
      {good || neutral || bad ?
        (
          <>
            <p>good {good}</p>
            <p>neutral {neutral}</p>
            <p>bad {bad}</p>

            <p>all {good + neutral + bad}</p>
            <p>average {(good - bad) / (good + neutral + bad)}</p>
            <p>positive {good * 100 / (good + neutral + bad)} %</p>
          </>
        )
        : 'No feedback given'

      }

    </>
  )
}

export default Statistics