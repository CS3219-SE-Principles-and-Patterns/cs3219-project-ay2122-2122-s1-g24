import React, { useEffect, useState } from 'react';
import io from "socket.io-client";
import CodeEnv from './codeEnv';
import Question from './question';
import PartnerInfo from './partnerInfo';
import { Container } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

const Cookies = require("js-cookie");

const Room = (props) => {
  const [questionTitle, setQuestionTitle] = useState();
  const [questionDesc, setQuestionDesc] = useState();
  const [names, setNames] = useState();

  const id = props.match.params.id;
  const difficulty = props.match.params.difficulty;
  const token = Cookies.get("token")
  const  loggedIn = Cookies.get("isLoggedIn");
  const socket = io('ws://localhost:8080/rooms', { transports: ['websocket'] });
  const codemirrorRef = React.useRef();

  React.useEffect(() => {
    const current = codemirrorRef.current.editor.display.wrapper.style.height = "1000px";
  });
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
  if (loggedIn == "false") {
      return <Redirect to="/unauthorised" />;
  }

    return (
        <div>
            <Container style={{marginTop: "20px"}}>
                <PartnerInfo names = { names } />
                <Question style={{marginTop: "20px", marginBottom:"20px"}} questionTitle = { questionTitle } questionDesc = { questionDesc } questionDiff = {difficulty} />
 
                <CodeEnv id = { id } socket = { socket } ref={codemirrorRef}/>
            </Container>
        </div>
    )
}

export default Room;
