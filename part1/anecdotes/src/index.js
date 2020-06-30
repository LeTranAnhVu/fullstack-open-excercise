import React, {useEffect, useState} from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Array(props.anecdotes.length).fill(0))
  const [maxVoteIndex, setMaxVoteIndex] = useState(null)
  const randomPick = () => {
    const len = props.anecdotes.length
    if (len) {
      // random int between > 0 and < length
      const number = Math.floor(Math.random() * (len))
      setSelected(number)
    }
  }
  const vote= () => {
    const clonedArr = [...points]
    clonedArr[selected]++
    setPoints(clonedArr)

  }

  useEffect(() => {
    // find index of max votes
    const maxIndex = points.indexOf(Math.max(...points))
    setMaxVoteIndex(maxIndex)
  }, [points])
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{props.anecdotes[selected]}</p>
      <p>has {points[selected]} votes</p>
      <button onClick={vote}>vote</button>
      <button onClick={randomPick}>next anecdote</button>
      <h1>Anecdote with most votes</h1>
      {
        maxVoteIndex !== null && <>
          <p>{props.anecdotes[maxVoteIndex]}</p>
          <p>has {points[maxVoteIndex]} votes</p>
        </>
      }
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes}/>,
  document.getElementById('root')
)