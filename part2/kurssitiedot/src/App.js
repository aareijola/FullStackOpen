import React from 'react'

const Header = (props) => {
  return (
    <div>
      <h1>{props.course.name}</h1>
    </div>
  )
}

const Part = (props) => {
  return (
    <div>
      <p>{props.part} {props.exercises}</p>
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      {props.parts.map(part => 
        <Part part = {part.name} exercises = {part.exercises} key = {part.id} />
      )}
    </div>
  )
}

const Total = (props) => {
  let sum = 0
  props.parts.forEach(part => {
    sum += part.exercises
  });
  return (
    <div>
      <h3> total of {sum} exercises </h3>
    </div>
  )
}

const Course = ({course}) => {
  return (
    <div>
      <Header course = {course}/>
      <Content parts = {course.parts}/>
      <Total parts = {course.parts} />
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

export default App