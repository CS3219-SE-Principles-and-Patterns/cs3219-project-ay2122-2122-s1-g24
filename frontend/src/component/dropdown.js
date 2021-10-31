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
    const {token} =  useAuth();
    const matchMake = ()=> {
        const socket = io('http://localhost:8080/matchMake');
        socket.emit('findMatch', {
            "difficulty" : difficulty,
            "auth" : token
        }) 
 
        socket.on('assignRoom', (match) => {
            history.push(`room/${match["roomId"]}`)
        })
    }
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
                <Dropdown.Item href="#/action-1" onClick={()=> {difficulty = "Easy"}} >Easy</Dropdown.Item>
                <Dropdown.Item href="#/action-2" onClick={()=> {difficulty = "Medium"}}>Medium</Dropdown.Item>
                <Dropdown.Item href="#/action-3" onClick={()=> {difficulty = "Hard"}}>Hard</Dropdown.Item>
            </Dropdown.Menu>
            </Dropdown>
            <Button variant="primary" onClick={matchMake}>Find a match</Button>{' '}
        </Container>
    )
}
export default DropDownMenu;