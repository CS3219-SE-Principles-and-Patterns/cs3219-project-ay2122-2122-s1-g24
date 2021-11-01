import React, { useEffect } from 'react';
import { useAuth } from  "../context/AuthContext";
import io from "socket.io-client";
import CodeEnv from './codeEnv';
import Question from './question';
import PartnerInfo from './partnerInfo';

const Room = (props) => {
    let questionTitle, questionDesc, names;
    const id = props.match.params.id;
    const { token } =  useAuth();
    const socket = io('ws://localhost:8080/rooms', { transports: ['websocket'] });

    useEffect(() => {
        socket.emit('joinRoom', {auth: token, room: id}, roomDetails => {
            if(roomDetails === undefined) return;
            questionTitle = roomDetails.questionTitle;
            questionDesc = roomDetails.questionDesc;
            names = roomDetails.users;
        });

        return function cleanup() {
            socket.emit("endSession", {auth: token, room: id});
        };
    }, []);

    return (
        <div>
            <PartnerInfo names = { names } />
            <Question questionTitle = { questionTitle } questionDesc = { questionDesc } />
            <CodeEnv id={id} socket={socket} />
        </div>
    )
}

export default Room;
