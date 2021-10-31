import React from 'react';
import Container from 'react-bootstrap/Container'
import { Link } from 'react-router-dom'
import style from './dropdown.css'
import Dropdown from 'react-bootstrap/Dropdown'
import axios from "axios";
let qn = "pick a difficulty"
var DropDownMenu = () => {
    const matchMake = ()=> {
        //const socket = io('http://localhost:8080/matchMake');
        //socket.emit('matchMake', {})
        //socket.on('matchMake', )
    }
    return (
        <Container fluid style = {{marginTop : "20px"}}>
            <div className = {style.header}>
                <h3>Select Question</h3>
            </div>
            <Dropdown>
                <Dropdown.Toggle variant="transparent" id="dropdown-basic">
                    {qn}
                </Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Item href="#/action-1" onClick={()=> {qn = "Easy"}} >Easy</Dropdown.Item>
                <Dropdown.Item href="#/action-2" onClick={()=> {qn = "Medium"}}>Medium</Dropdown.Item>
                <Dropdown.Item href="#/action-3" onClick={()=> {qn = "Hard"}}>Hard</Dropdown.Item>
            </Dropdown.Menu>
            </Dropdown>
            <Link to="/room" className="btn btn-primary">Find a match</Link>
        </Container>
    )
}
export default DropDownMenu;