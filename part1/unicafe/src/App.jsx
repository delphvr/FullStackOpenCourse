import { useState } from "react";

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad;
  const average = () => {
    if (all == 0) {
      return 0;
    }
    return (good + bad * -1) / all;
  };
  const positive = () => {
    if (all == 0) {
      return 0;
    }
    return good / all;
  };
  return (
    <>
      <h1>Statistics</h1>
      <p>Good: {good}</p>
      <p>Neutral: {neutral}</p>
      <p>Bad: {bad}</p>
      <p>All: {all}</p>
      <p>Average: {average()}</p>
      <p>Positive: {positive()}%</p>
    </>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button onClick={() => setGood(good + 1)} text={"good"} />
      <Button onClick={() => setNeutral(neutral + 1)} text={"neutral"} />
      <Button onClick={() => setBad(bad + 1)} text={"bad"} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
