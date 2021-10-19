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

export default Course