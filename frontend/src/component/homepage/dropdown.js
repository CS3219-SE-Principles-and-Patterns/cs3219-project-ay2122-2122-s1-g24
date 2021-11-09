import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Cookies from 'js-cookie';
import style from './dropdown.css';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import io from 'socket.io-client';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

const DIFFICULTY = { EASY: 'easy', MEDIUM: 'medium', HARD: 'hard' };
const LOGIN_URL = '/login'

const DropDownMenu = ({ history }) => {
  const token = Cookies.get('token')
  const loggedIn = Cookies.get('isLoggedIn');
  const HOST = window.location.origin.replace(/^http/, 'ws');
  const socket = io(HOST + '/matchmaking', {
    transports: ['websocket']
  });
  const [diff, setDiff] = useState('pick a difficulty');
  const [loading, setLoading] = useState(false);

  socket.on('assignRoom', (match) => {
    history.push(`/room/${match}`);
  });

  const matchMake = () => {
    setLoading(true);
    socket.emit(
      'findMatch',
      {
        difficulty: diff,
        auth: token
      },
      ({ ok, authError }) => {
        if (!ok) {
          if (authError)
            window.location.href = LOGIN_URL;
        }
      }
    );
    setTimeout(() => {
      socket.emit('disconnectUser');
      setLoading(false);
    }, 30000);
  };

  const buttonContent = () => {
    if (loggedIn !== 'true') {
      return (
        <Button variant="primary" href={LOGIN_URL} disabled={loading} style={{ marginTop: "3px" }}>
          Login
        </Button>);
    }

    const disabled = loading || !Object.values(DIFFICULTY).includes(diff);

    return (
      <Button variant="primary" onClick={matchMake} disabled={disabled} style={{ marginTop: "5px" }}>
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
            onClick={() => {
              setDiff(DIFFICULTY.EASY)
              setLoading(false);
            }}
          >
            Easy
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => {
              setDiff(DIFFICULTY.MEDIUM)
              setLoading(false);
            }}
          >
            Medium
          </Dropdown.Item>
          <Dropdown.Item
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
export default withRouter(DropDownMenu);
