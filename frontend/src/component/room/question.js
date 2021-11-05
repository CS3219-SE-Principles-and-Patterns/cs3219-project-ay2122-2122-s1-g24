import React from 'react';

const Question = ({questionDiff, questionTitle, questionDesc}) => {
  
  const difficulty = questionDiff === undefined ? "" : questionDiff[0].toUpperCase() + questionDiff.substring(1);

  const colours = { easy: 'green', medium: 'orange', hard: 'red' };
  const difficultyText = <h1 style={{ color: colours[questionDiff], padding: '10px' }}>{difficulty}</h1>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h1 style={{ padding: '10px' }}>{questionTitle}</h1>
        {difficultyText}
      </div>
      <div style={{ marginTop: '10px', marginBottom: '20px', padding: '10px' }}>{questionDesc}</div>
    </div>
  );
};

export default Question;