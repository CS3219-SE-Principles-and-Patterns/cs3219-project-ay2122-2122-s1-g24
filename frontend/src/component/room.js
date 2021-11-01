import React, { useEffect } from 'react';
import { useAuth } from  "../context/AuthContext";
import io from "socket.io-client";
import CodeEnv from './codeEnv';
import Question from './question';
import PartnerInfo from './partnerInfo';

const Room = (props) => {
    let question, partnerName;
    const id = props.match.params.id;
    const socket = io('https://localhost:8080/rooms', { transports: ['websocket'] });
    const {token} =  useAuth();
    socket.emit('joinRoom', {auth: token, room: id}, roomDetails => {
        question = roomDetails.question;
        partnerName = roomDetails.partnerName;
    });
    useEffect(() => {
        return function cleanup() {
            socket.emit("endSession", {auth: token, room: id});
        };
    });
    return (
        <div>
            <PartnerInfo partnerName = {partnerName} />
            <Question question = {question}/>
            <CodeEnv id = {id} />
        </div>
    )
}

export default Room;
