const Header = ({name}: {name: string}) => {
  return (
    <h1>{name}</h1>
  )
};

type CoursePart = {
  name: string,
  exerciseCount: number
}

const Content = ({ parts }: { parts: Array<CoursePart>}) => {
  return (
  <div>
    {parts.map((p) => (<p key={p.name}>{p.name} {p.exerciseCount}</p>))}
  </div>)
}

const Total = ({ parts }: {parts: Array<CoursePart>}) => {
  return (
    <p>
      Number of exercises{" "}
      {parts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
    )
}


const App = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];

  return (
    <div>
      <Header name= {courseName}/>
      <Content parts={courseParts}/>
      <Total parts={courseParts}/>
    </div>
  );
};

export default App;