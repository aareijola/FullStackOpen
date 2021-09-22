import React, { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Display = ({text, count}) => (
  <p>{text} {count}</p>
)

const Statistics = ({good, neutral, bad}) => {
  const all = good + neutral + bad
  if (all === 0) return (
    <div>No feedback given</div>
  )
  const avg = (good - bad) / all
  
  return (
    <div>
      <Display text = "good" count = {good}/>
      <Display text = "neutral" count = {neutral}/>
      <Display text = "bad" count = {bad}/>
      <Display text = "all" count = {all}/>
      <Display text = "average" count = {avg}/>
      <Display text = "positive" count = {(good / all) * 100 + " %"}/>
    </div>
  )
}


const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1> give feedback </h1>
      <Button handleClick = {() => setGood(good + 1)} text = "good"/>
      <Button handleClick = {() => setNeutral(neutral + 1)} text = "neutral"/>
      <Button handleClick = {() => setBad(bad + 1)} text = "bad"/>
      <h1>statistics</h1>
      <Statistics good = {good} neutral = {neutral} bad = {bad}/>
    </div>
  )
}

export default App