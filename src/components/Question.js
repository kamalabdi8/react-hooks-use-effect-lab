import React, { useState, useEffect } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  // useEffect to handle the countdown timer
  useEffect(() => {
    if (timeRemaining > 0) {
      const timerId = setTimeout(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);

      // Cleanup function to clear the timeout when timeRemaining changes or when component unmounts
      return () => clearTimeout(timerId);
    } else {
      // When timeRemaining hits 0, reset the timer to 10 seconds and trigger onAnswered
      setTimeRemaining(10);
      onAnswered(false);
    }
  }, [timeRemaining, onAnswered]); // Re-run useEffect when timeRemaining changes

  function handleAnswer(isCorrect) {
    setTimeRemaining(10); // Reset the timer when the user answers
    onAnswered(isCorrect); // Pass whether the answer was correct
  }

  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;

