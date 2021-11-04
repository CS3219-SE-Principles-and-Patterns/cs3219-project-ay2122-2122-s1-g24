import React from 'react';


const Question = (props) => {

    const colours= { "easy": "green", "medium": 'orange', HARD: 'red' };
    const difficulty =  <h3 style={{ color: colours[props.questionDiff] }}>{props.questionDiff}</h3>;
    return (
        <div>
            <h1>{props.questionTitle}</h1>
            {difficulty}
            <div>{props.questionDesc}</div>
        </div>
    )
}

export default Question;