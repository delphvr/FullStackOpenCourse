const Header = (props) => <h2>{props.course}</h2>;

const Content = (props) => (
  <div>
    {props.parts.map((part, idx) => (
      // use a stable unique key when possible; fall back to name or index
      <Part key={part.id || part.name || idx} part={part} />
    ))}
  </div>
);

const Part = (props) => (
  <p>
    {props.part.name} {props.part.exercises}
  </p>
);

const Total = (props) => <strong>Total of {props.total} exercises</strong>;

const Course = ({ courses }) => {
  return (
    <div>
      {courses.map((course) => {
        return (
          <>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total
              total={course.parts.reduce((sum, e) => sum + e.exercises, 0)}
            />
          </>
        );
      })}
    </div>
  );
};

export default Course;
