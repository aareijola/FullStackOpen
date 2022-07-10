// new types
interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

interface DescribedCoursePartBase extends CoursePartBase {
  description: string;
}

interface CourseNormalPart extends DescribedCoursePartBase {
  type: 'normal';
}
interface CourseProjectPart extends CoursePartBase {
  type: 'groupProject';
  groupProjectCount: number;
}

interface CourseSubmissionPart extends DescribedCoursePartBase {
  type: 'submission';
  exerciseSubmissionLink: string;
}

interface CourseSpecialPart extends DescribedCoursePartBase {
  type: 'special';
  requirements: Array<string>;
}

type CoursePart =
  | CourseNormalPart
  | CourseProjectPart
  | CourseSubmissionPart
  | CourseSpecialPart;

const Header = ({ name }: { name: string }) => {
  return <h1>{name}</h1>;
};

const assertNever = (value: never): never => {
  throw new Error(`Unhandled union member: ${JSON.stringify(value)}`);
};

const Part = ({ part }: { part: CoursePart }) => {
  switch (part.type) {
    case 'normal':
      return (
        <p>
          <b>
            {part.name} {part.exerciseCount}
          </b>
          <div>
            <i>{part.description}</i>
          </div>
        </p>
      );
    case 'groupProject':
      return (
        <p>
          <b>
            {part.name} {part.exerciseCount}
          </b>
          <div>project exercises {part.groupProjectCount}</div>
        </p>
      );
    case 'submission':
      return (
        <p>
          <b>
            {part.name} {part.exerciseCount}
          </b>
          <div>
            <i>{part.description}</i>
          </div>
          <div>submit to {part.exerciseSubmissionLink}</div>
        </p>
      );
    case 'special':
      return (
        <p>
          <b>
            {part.name} {part.exerciseCount}
          </b>
          <div>
            <i>{part.description}</i>
          </div>
          <div>required skills: {part.requirements.join(', ')}</div>
        </p>
      );
    default:
      return assertNever(part);
  }
};

const Content = ({ parts }: { parts: Array<CoursePart> }) => {
  return (
    <div>
      {parts.map((p) => (
        <Part key={p.name} part={p} />
      ))}
    </div>
  );
};

const Total = ({ parts }: { parts: Array<CoursePart> }) => {
  return (
    <p>
      Number of exercises{' '}
      {parts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
  );
};

const App = () => {
  const courseName = 'Half Stack application development';
  const courseParts: CoursePart[] = [
    {
      name: 'Fundamentals',
      exerciseCount: 10,
      description: 'This is the leisured course part',
      type: 'normal',
    },
    {
      name: 'Advanced',
      exerciseCount: 7,
      description: 'This is the harded course part',
      type: 'normal',
    },
    {
      name: 'Using props to pass data',
      exerciseCount: 7,
      groupProjectCount: 3,
      type: 'groupProject',
    },
    {
      name: 'Deeper type usage',
      exerciseCount: 14,
      description: 'Confusing description',
      exerciseSubmissionLink: 'https://fake-exercise-submit.made-up-url.dev',
      type: 'submission',
    },
    {
      name: 'Backend development',
      exerciseCount: 21,
      description: 'Typing the backend',
      requirements: ['nodejs', 'jest'],
      type: 'special',
    },
  ];

  return (
    <div>
      <Header name={courseName} />
      <Content parts={courseParts} />
      <Total parts={courseParts} />
    </div>
  );
};

export default App;
