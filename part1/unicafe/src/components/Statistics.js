import React from 'react'
import Statistic from './Statistic'

const Statistics = ({good, neutral, bad}) => {
  return (
    <>
      <h2>statistics</h2>
      {good || neutral || bad ?
        (
          <table>
            <tbody>
            <Statistic text={'good'} value={good}/>
            <Statistic text={'neutral'} value={neutral}/>
            <Statistic text={'bad'} value={bad}/>
            <tr>
              <td>all</td>
              <td>{good + neutral + bad}</td>
            </tr>
            <tr>
              <td>average</td>
              <td>{(good - bad) / (good + neutral + bad)}</td>
            </tr>
            <tr>
              <td>positive</td>
              <td>{good * 100 / (good + neutral + bad)} %</td>
            </tr>
            </tbody>

          </table>
        )
        : 'No feedback given'

      }

    </>
  )
}

export default Statistics