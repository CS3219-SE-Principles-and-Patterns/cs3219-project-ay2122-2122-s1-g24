import React from 'react';


const Question = (props) => {

    const difficulty = props.questionDiff[0].toUpperCase() + props.questionDiff.substring(1);
    const colours= { "easy": "green", "medium": 'orange', "hard": 'red' };
    const difficultyText =  <h1 style={{ color: colours[props.questionDiff],  }}>{difficulty}</h1>;
    return (
        <div>
            <div  style={{ display: "flex", justifyContent: "space-between" }}>
            <h1>{props.questionTitle}</h1>
            {difficultyText}
            </div>
            <div style={{marginTop: "10px", marginBottom:"10px"}} >{props.questionDesc}</div>
        </div>
    )
}

export default Question;