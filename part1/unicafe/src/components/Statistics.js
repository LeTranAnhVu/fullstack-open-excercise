import React from 'react'
import Statistic from './Statistic'
const Statistics = ({good, neutral, bad}) => {
  return (
    <>
      <h2>statistics</h2>
      {good || neutral || bad ?
        (
          <>
            <Statistic text={"good"} value={good}/>
            <Statistic text={"neutral"} value={neutral}/>
            <Statistic text={"bad"} value={bad}/>

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