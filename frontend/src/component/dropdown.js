import React from 'react';
import Container from 'react-bootstrap/Container'
import style from './dropdown.css'
import Dropdown from 'react-bootstrap/Dropdown'
import {useAuth } from  "../context/AuthContext";
import Button from 'react-bootstrap/Button'
import io from "socket.io-client";
import { useHistory, Redirect } from 'react-router-dom';

let difficulty = "pick a difficulty"

var DropDownMenu = () => {
    const history = useHistory();
    const { token } = useAuth();
    const socket = io('http://localhost:8080/matchmaking', { transports: ['websocket'] });

    socket.on('assignRoom' , match => {
        console.log(match);
        history.push("/room/id");
    });

    const matchMake = () => {
        socket.emit('findMatch', {
            "difficulty" : difficulty, 
            "auth" : token
        }, (response) => {
            if (response.err) {
                alert("error");
            }
        });
        socket.on('assignRoom' , (match) => {
            history.push("/room/" + match)
        })
    };


    return (
        <Container fluid style = {{marginTop : "20px"}}>
            <div className = {style.header}>
                <h3>Select Question</h3>
            </div>
            <Dropdown>
                <Dropdown.Toggle variant="transparent" id="dropdown-basic">
                    {difficulty}
                </Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Item href="#/easy" onClick={()=> {difficulty = "easy"}} >Easy</Dropdown.Item>
                <Dropdown.Item href="#/medium" onClick={()=> {difficulty = "medium"}}>Medium</Dropdown.Item>
                <Dropdown.Item href="#/hard" onClick={()=> {difficulty = "hard"}}>Hard</Dropdown.Item>
            </Dropdown.Menu>
            </Dropdown>
            <Button variant="primary" onClick={matchMake}>Find a match</Button>{' '}
        </Container>
    );
}
export default DropDownMenu;
