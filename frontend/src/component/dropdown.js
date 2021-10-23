import React from 'react';
import Container from 'react-bootstrap/Container'
import { Link } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import style from './dropdown.css'
import Dropdown from 'react-bootstrap/Dropdown'

let qn = "pick a difficulty"
var DropDownMenu = () => {
    const difficulties = ["Easy", "Medium", "Hard"];
    return (
        <Container fluid style = {{marginTop : "20px"}}>
            <div className = {style.header}>
                <h2>Select Question</h2>
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