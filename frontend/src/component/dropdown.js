import React, { useState, useEffect, useRef } from 'react';
import Container from 'react-bootstrap/Container';
import style from './dropdown.css';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import {Spinner} from 'react-bootstrap'
import io from 'socket.io-client';
import { useHistory } from 'react-router-dom';
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const difficulties = { EASY: 'easy', MEDIUM: 'medium', HARD: 'hard' };
const Cookies = require("js-cookie");
var DropDownMenu = () => {

  const history = useHistory();
  const token = Cookies.get("token")
  var loggedIn = Cookies.get("isLoggedIn");
  var socket = useRef(null);
  const [diff, setDiff] = useState('pick a difficulty');
  const [loading, setLoading] = useState(false);

  const [width, setWidth] = React.useState(5000);
  const [height, setHeight] = React.useState(5000);
  const ref = React.useRef(null);

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

  const matchMake = () => {
    setLoading(true);
    socket.current.emit(
      'findMatch',
      {
        difficulty: diff,
        auth: token
      },
      response => {
        
      }
    );
    setTimeout(() => {
        setLoading(false );
      }, 30000);
  };

  const buttonContent = () => {
      if (loggedIn == "false") {
        return (
        <Button variant="primary" onClick={()=> history.push("http://localhost:8080/login")} disabled = {loading} >
            Login
        </Button>);
      }
      return (
        <Button variant="primary" onClick={matchMake} disabled = {loading} >
        {!loading ? <span>Find a match</span> : <Loader type="TailSpin" color="#00BFFF" height={20} width={90} />}
        </Button>
      )

  }

  return (

    <Container className="justify-content-md-center" style={{ marginTop: "60px", justifyContent:"center"}}>
      <div className={style.header}>
        <h1>Welcome to Peer Prep</h1>
      </div>
      <Dropdown>
        <Dropdown.Toggle variant="transparent" id="dropdown-basic">
          {diff}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item
            href="#/easy"
            onClick={() => {
                setDiff(difficulties.EASY)
                setLoading(false);
            }}
          >
            Easy
          </Dropdown.Item>
          <Dropdown.Item
            href="#/medium"
            onClick={() => {
                setDiff(difficulties.MEDIUM)
                setLoading(false);
            }}
          >
            Medium
          </Dropdown.Item>
          <Dropdown.Item
            href="#/hard"
            onClick={() => {
                setDiff(difficulties.HARD)
                setLoading(false);
            }}
          >
            Hard
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      {buttonContent()}
    </Container>

  );
};
export default DropDownMenu;
