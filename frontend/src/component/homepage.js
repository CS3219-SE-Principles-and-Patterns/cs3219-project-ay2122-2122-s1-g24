import React from 'react';
import ReactDOM from 'react-dom';   
const difficulty = ['Easy', 'Medium', 'Hard'];   
const list= difficulty.map((qn)=>{   
    return <li><a href="/room">{qn}</a></li>;   
});   
const Homepage = () => {
    return (
        <div style={{display: 'flex',  justifyContent:'center', height: '1000vh'}}>
            <ul> {list} </ul>   
    </div>  
    )
}

export default Homepage;