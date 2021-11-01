import React from 'react';

const Question = (props) => {
    return (
        <div>
            {props.question}
            <h1>Two Sum</h1>
            <body>
                <p>
                    Given an array of integers <code>nums</code> and an integer <code>target</code>, return indices of the two numbers such that they add up to <code>target</code>.
                </p>
                <p>
                    You may assume that each input would have <bold>exactly one solution</bold>, and you may not use the same element twice.
                </p>
                You can return the answer in any order.
            </body>
        </div>
    )
}

export default Question;