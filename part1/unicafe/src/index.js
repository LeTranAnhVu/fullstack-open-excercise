import React, {useState} from 'react'
import ReactDOM from 'react-dom'
import Statistics from './components/Statistics'
const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const feedback = (type) => {
    if (type === 'good') {
      setGood(good + 1)
    } else if (type === 'neutral') {
      setNeutral(neutral + 1)
    } else {
      setBad(bad + 1)
    }
  }
  return (
    <div>
      <h1>give feedback</h1>

      <button onClick={() => feedback('good')}>good</button>
      <button onClick={() => feedback('neutral')}>neutral</button>
      <button onClick={() => feedback('bad')}>bad</button>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

ReactDOM.render(<App/>,
  document.getElementById('root')
)