import React from 'react';
import Container from 'react-bootstrap/Container'
import { Button, Spinner } from 'react-bootstrap'
import style from './dropdown.css'
import Dropdown from 'react-bootstrap/Dropdown'
import {useAuth} from  "../context/AuthContext";
import io from "socket.io-client";
import { useHistory } from 'react-router-dom';

const Cookies = require("js-cookie");

let difficulty = "pick a difficulty"

var DropDownMenu = () => {
    const history = useHistory();
    const token = Cookies.get("token")
    const socket = io('ws://localhost:8080/matchmaking', { transports: ['websocket'] });


    const matchMake = () => {
        socket.emit('findMatch', {
            "difficulty" : difficulty, 
            "auth" : token
        }, (response) => {
            if (response.err) {
                alert("error");
            }
        });
        socket.on('assignRoom' , match => {

            history.push(`/room/${match}`);
        });    
    };


    return (
        <Container fluid style = {{marginTop : "20px", display: 'flex',  justifyContent:'center'}}>
            <div>
            <div className = {style.header} >
                <h3>Select Question</h3>
            </div>
            <Dropdown  fluid style = {{marginTop : "20px", display: 'flex', width:"50"}}>
                <Dropdown.Toggle variant="success" id="dropdown-basic" style = {{width:"50"}}>
                    {difficulty}
                </Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Item href="#/easy" onClick={()=> {difficulty = "easy"}} >Easy</Dropdown.Item>
                <Dropdown.Item href="#/medium" onClick={()=> {difficulty = "medium"}}>Medium</Dropdown.Item>
                <Dropdown.Item href="#/hard" onClick={()=> {difficulty = "hard"}}>Hard</Dropdown.Item>
            </Dropdown.Menu>
            </Dropdown>
            <Button fluid style = {{marginTop : "20px", display: 'flex', width:"50"}} variant="primary" onClick={matchMake} style = {{marginTop : "20px", display: 'flex'}}>
            <Spinner
                    as="span"
                    variant="warning"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    animation="grow"/>
                      Loading...
                </Button>{' '}
            </div>
        </Container>
    );
}
export default DropDownMenu;
