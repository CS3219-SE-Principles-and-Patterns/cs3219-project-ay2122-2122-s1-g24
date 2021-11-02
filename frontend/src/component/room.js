import React, { useEffect, useState } from 'react';
import { useAuth } from  "../context/AuthContext";
import io from "socket.io-client";
import CodeEnv from './codeEnv';
import Question from './question';
import PartnerInfo from './partnerInfo';

const Cookies = require("js-cookie");

const Room = (props) => {
    const [ questionTitle, setQuestionTitle ] = useState();
    const [ questionDesc, setQuestionDesc ] = useState();
    const [ names, setNames ] = useState();

    const id = props.match.params.id;
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
            socket.emit("endSession", {auth: token, room: id});
        };
    }, []);

    return (
        <div>
            <PartnerInfo names = { names } />
            <Question questionTitle = { questionTitle } questionDesc = { questionDesc } />
            <CodeEnv id = { id } socket = { socket } />
        </div>
    )
}

export default Room;
