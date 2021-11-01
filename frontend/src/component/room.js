import React, { useState } from 'react';
import CodeEnv from './codeEnv';
import Question from './question';

const Room = (props) => {
    const question;
    useEffect(() => {
        // const token = GET FROM ROGER
        const id = props.match.params.id;
        const socket = io('https://localhost:8080/rooms');
        socket.emit('joinRoom', {auth: token, room: id}, roomDetails => {
            question = roomDetails.question;
        });
        return function cleanup() {
            socket.emit("leaveRoom", {auth: token, room: id});
        };
    });
    return (
        <div>
            <Question question = {question}/>
            <CodeEnv/>
        </div>
    )
}

export default Room;
