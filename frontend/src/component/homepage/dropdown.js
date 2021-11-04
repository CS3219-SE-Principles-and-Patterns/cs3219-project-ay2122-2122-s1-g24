import React, { useState, useEffect, useRef } from 'react';
import Container from 'react-bootstrap/Container';
import Cookies from 'js-cookie';
import style from './dropdown.css';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import io from 'socket.io-client';
import { useHistory } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

const DIFFICULTY = { EASY: 'easy', MEDIUM: 'medium', HARD: 'hard' };
const DropDownMenu = () => {
  const history = useHistory();
  const token = Cookies.get('token')
  const loggedIn = Cookies.get('isLoggedIn');
  const socket = useRef(null);
  const [diff, setDiff] = useState('pick a difficulty');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    socket.current = io('ws://localhost:8080/matchmaking', {
      transports: ['websocket']
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
      }
    );

    socket.current.on('assignRoom', match => {
      history.push(`/room/${diff}/${match}`);
    });
    setTimeout(() => {
      setLoading(false);
    }, 30000);
  };

  const buttonContent = () => {
    if (loggedIn == 'false') {
      return (
        <Button variant="primary" href="http://localhost:8080/login" disabled={loading} style={{ marginTop: "3px" }}>
          Login
        </Button>);
    }

    return (
      <Button variant="primary" onClick={matchMake} disabled={loading} style={{ marginTop: "5px" }}>
        {!loading ? <span>Find a match</span> : <Loader type="TailSpin" color="#00BFFF" height={20} width={90} />}
      </Button>
    )
  }

  return (
    <Container style={{ marginTop: "60px", justifyContent: "center" }}>
      <div className={style.header}>
        <h1>Welcome to Peer Prep</h1>
      </div>
      <Dropdown>
        <Dropdown.Toggle variant="transparent" id="dropdown-basic">
          {diff[0].toUpperCase() + diff.substring(1)}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item
            href="#/Easy"
            onClick={() => {
              setDiff(DIFFICULTY.EASY)
              setLoading(false);
            }}
          >
            Easy
          </Dropdown.Item>
          <Dropdown.Item
            href="#/Medium"
            onClick={() => {
              setDiff(DIFFICULTY.MEDIUM)
              setLoading(false);
            }}
          >
            Medium
          </Dropdown.Item>
          <Dropdown.Item
            href="#/Hard"
            onClick={() => {
              setDiff(DIFFICULTY.HARD)
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
