import React, { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)


const Statistics = ({good, neutral, bad}) => {
  const all = good + neutral + bad
  if (all === 0) return (
    <div>No feedback given</div>
  )
  const avg = (good - bad) / all
  return (
    <table>
      <tbody>
        <tr>
          <td>good</td>
          <td>{good}</td>
        </tr>
        <tr>
          <td>neutral</td>
          <td>{neutral}</td>
        </tr>
        <tr>
          <td>bad</td>
          <td>{bad}</td>
        </tr>
        <tr>
          <td>all</td>
          <td>{all}</td>
        </tr>
        <tr>
          <td>average</td>
          <td>{avg}</td>
        </tr>
        <tr>
          <td>positive</td>
          <td>{(good / all) * 100 + " %"}</td>
        </tr>

      </tbody>
    </table>
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