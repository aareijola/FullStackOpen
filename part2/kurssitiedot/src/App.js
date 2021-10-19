import React from 'react'

const Header = (props) => {
  return (
    <div>
      <h2>{props.course.name}</h2>
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

const Total = ({parts}) => {
  const sum = parts.reduce( (t,c) => t + c.exercises, 0)
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
  const courses = [
    {
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
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <h1>Web development curriculum</h1>
      {courses.map(course => <Course course = {course} key = {course.id}/>)}
    </div>
  )
}

export default App