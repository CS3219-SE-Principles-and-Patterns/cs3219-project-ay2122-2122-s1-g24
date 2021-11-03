import React, { useState, useEffect, useRef } from 'react';
import Container from 'react-bootstrap/Container'
import style from './dropdown.css'
import Dropdown from 'react-bootstrap/Dropdown'
import {useAuth } from  "../context/AuthContext";
import Button from 'react-bootstrap/Button'
import io from "socket.io-client";
import { useHistory } from 'react-router-dom';

const difficulties = 
{EASY : 'easy',
MEDIUM : 'medium',
HARD : 'hard',}

var DropDownMenu = () => {
    const history = useHistory();
    const { token } = useAuth();
    var socket = useRef(null);
    const [diff, setDiff] = useState("pick a difficulty");

    useEffect(() => {
        socket.current = io('ws://localhost:8080/matchmaking', { transports: ['websocket'] });

        socket.current.on('assignRoom' , match => {
            console.log(match);
            history.push(`/room/${match}`);
        });

        return function cleanup() {
            socket.current.disconnect();
            
        };
    }, []);


    const matchMake = () => {
        socket.current.emit('findMatch', {
            "difficulty" : diff, 
            "auth" : token
        }, (response) => {
            if (response.err) {
                alert("error");
            }
        });
    };


    return (
        <Container fluid style = {{marginTop : "20px"}}>
            <div className = {style.header}>
                <h3>Select Question</h3>
            </div>
            <Dropdown>
                <Dropdown.Toggle variant="transparent" id="dropdown-basic">
                    {diff}
                </Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Item href="#/easy" onClick={()=> setDiff(difficulties.EASY)} >Easy</Dropdown.Item>
                <Dropdown.Item href="#/medium" onClick={()=> setDiff(difficulties.MEDIUM)}>Medium</Dropdown.Item>
                <Dropdown.Item href="#/hard" onClick={()=> setDiff(difficulties.HARD)}>Hard</Dropdown.Item>
            </Dropdown.Menu>
            </Dropdown>
            <Button variant="primary" onClick={matchMake}>Find a match</Button>{' '}
        </Container>
    );
}
export default DropDownMenu;
