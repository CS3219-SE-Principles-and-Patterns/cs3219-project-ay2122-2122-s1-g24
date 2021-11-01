import React, { useEffect } from 'react';
import { useAuth } from  "../context/AuthContext";
import io from "socket.io-client";
import CodeEnv from './codeEnv';
import Question from './question';

const Room = (props) => {
    let question;
    const id = props.match.params.id;
    const socket = io('https://localhost:8080/rooms');
    const {token} =  useAuth();
    socket.emit('joinRoom', {auth: token, room: id}, roomDetails => {
        question = roomDetails.question;
    });
    useEffect(() => {
        return function cleanup() {
            socket.emit("endSession", {auth: token, room: id});
        };
    });
    return (
        <div>
            <Question question = {question}/>
            <CodeEnv id = {id} />
        </div>
    )
}

export default Room;
