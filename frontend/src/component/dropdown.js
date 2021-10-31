import React from 'react';
import Container from 'react-bootstrap/Container'
import { Link, Redirect } from 'react-router-dom'
import style from './dropdown.css'
import Dropdown from 'react-bootstrap/Dropdown'
import { AuthProvider, useAuth } from  "../context/AuthContext";
import Button from 'react-bootstrap/Button'
import io from "socket.io-client";
import { useHistory } from 'react-router-dom';

let difficulty = "pick a difficulty"

var DropDownMenu = () => {
    const history = useHistory();
    const { token } = useAuth();
    const socket = io('http://localhost:8080/matchmaking', { transports: ['websocket'] });
    const matchMake = () => {
        console.log('matchmaking');
        socket.emit('findMatch', {
            "difficulty" : difficulty,
            "auth" : token
        }, (response) => {
            console.log(response.status); 
        });
    };

    socket.on('assignRoom', (match) => {
        history.push(`room/${match["roomId"]}`)
    });

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
                <Dropdown.Item href="#/easy" onClick={()=> {difficulty = "Easy"}} >Easy</Dropdown.Item>
                <Dropdown.Item href="#/medium" onClick={()=> {difficulty = "Medium"}}>Medium</Dropdown.Item>
                <Dropdown.Item href="#/hard" onClick={()=> {difficulty = "Hard"}}>Hard</Dropdown.Item>
            </Dropdown.Menu>
            </Dropdown>
            <Button variant="primary" onClick={matchMake}>Find a match</Button>{' '}
        </Container>
    );
}
export default DropDownMenu;
