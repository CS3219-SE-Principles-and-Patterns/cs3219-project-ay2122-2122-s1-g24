import React, { useState, useEffect, useRef } from 'react';
import Container from 'react-bootstrap/Container';
import style from './dropdown.css';
import Dropdown from 'react-bootstrap/Dropdown';
import { useAuth } from '../context/AuthContext';
import Button from 'react-bootstrap/Button';
import io from 'socket.io-client';
import { useHistory } from 'react-router-dom';

const difficulties = { EASY: 'easy', MEDIUM: 'medium', HARD: 'hard' };

var DropDownMenu = () => {
  const history = useHistory();
  const { token } = useAuth();
  var socket = useRef(null);
  const [diff, setDiff] = useState('pick a difficulty');

  useEffect(() => {
    socket.current = io('ws://localhost:8080/matchmaking', {
      transports: ['websocket']
    });

    socket.current.on('assignRoom', match => {
      history.push(`/room/${match}`);
    });

    return function cleanup() {
      socket.current.disconnect();
    };
  }, []);

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
  };

export default DropDownMenu;
