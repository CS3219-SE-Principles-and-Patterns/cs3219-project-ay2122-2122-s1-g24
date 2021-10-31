import React from 'react';
import TextBox from './textBox'
import { Redirect } from 'react-router-dom';
const room = () => {
    return (
        <div>
           <h2>Question room</h2>
           <p> Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.
You may assume that each input would have exactly one solution, and you may not use the same element twice
.You must use a sliding window to solve this question.</p>
        <TextBox />
        <button onClick={()=>Redirect("/")}>end</button>
        </div>
    )
}

export default room;