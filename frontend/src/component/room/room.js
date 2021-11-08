import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import io from 'socket.io-client';
import Cookies from 'js-cookie';
import CodeEnv from './codeEnv';
import Question from './question';
import PartnerInfo from './partnerInfo';

const Room = (props) => {
  const [questionTitle, setQuestionTitle] = useState();
  const [questionDesc, setQuestionDesc] = useState();
  const [questionDiff, setQuestionDiff] = useState();
  const [users, setUsers] = useState();

  const id = props.match.params.id;
  const token = Cookies.get('token')
  const HOST = window.location.origin.replace(/^http/, 'ws');
  const socket = io(HOST + '/rooms', { transports: ['websocket'] });

  useEffect(() => {
    socket.emit('joinRoom', { auth: token, room: id }, roomDetails => {
      if (roomDetails === undefined) return;
      setQuestionTitle(roomDetails.questionTitle);
      setQuestionDesc(roomDetails.questionDesc);
      setQuestionDiff(roomDetails.difficulty);
      const userNames = [roomDetails.users[0].name, roomDetails.users[1].name];
      setUsers(userNames);
    });
  }, []);

  const partner = users === undefined ? <div></div> : <PartnerInfo users={users}/>;

  return (
    <div>
      <Container style={{ marginTop: "20px" }}>
        {partner}
        <Question style={{ marginTop: "20px", marginBottom: "20px" }} questionTitle={questionTitle} questionDesc={questionDesc} questionDiff={questionDiff} />
        <CodeEnv id={id} socket={socket} />
      </Container>
    </div>
  )
}

export default Room;
