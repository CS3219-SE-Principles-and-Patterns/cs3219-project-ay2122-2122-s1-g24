import React, { useEffect, useState } from 'react';
import io from "socket.io-client";
import CodeEnv from './codeEnv';
import Question from './question';
import PartnerInfo from './partnerInfo';
import { Container } from 'react-bootstrap';
import room from "./room"
const Cookies = require("js-cookie");

const Room = (props) => {
  const [questionTitle, setQuestionTitle] = useState();
  const [questionDesc, setQuestionDesc] = useState();
  const [names, setNames] = useState();

    const id = props.match.params.id;
    const difficulty = props.match.params.difficulty;
    const token = Cookies.get("token")
    const socket = io('ws://localhost:8080/rooms', { transports: ['websocket'] });

  useEffect(() => {
    socket.emit('joinRoom', {auth: token, room: id}, roomDetails => {
      if(roomDetails === undefined) return;
      setQuestionTitle(roomDetails.questionTitle);
      setQuestionDesc(roomDetails.questionDesc);
      setNames(roomDetails.users);
    });

    return function cleanup() {
      socket.emit('endSession', {auth: token, room: id});
    };
  }, []);

    return (
        <div className='.room'>
            <Container>
                <PartnerInfo names = { names } />
                <Question questionTitle = { questionTitle } questionDesc = { questionDesc } />
 
                <CodeEnv id = { id } socket = { socket } />
            </Container>
        </div>
    )
}

export default Room;
