import React from 'react';

const Question = (props) => {
    return (
        <div>
            <h1>{props.questionTitle}</h1>
            <div>{props.questionDesc}</div>
        </div>
    )
}

export default Question;