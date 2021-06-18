import React from 'react';
import { Navbar, Nav, NavDropdown,  } from 'react-bootstrap'
import { PersonCircle } from 'react-bootstrap-icons';
import { NavLink} from 'react-router-dom'
function NavBar(props) {
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky='top'>
            <Navbar.Brand href="#home">Lap's Survey</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav"  >
                <Nav className="mr-auto" variant='pills'>
                    <NavLink to="/addsurvey">New survey </NavLink>
                    <Nav.Link href="/addsurvey">Pricing</Nav.Link>
                    
               
                    <Nav.Link href="#deets">More deets</Nav.Link>
                    <Nav.Link eventKey={2} href="#memes">
                        Dank memes
                    </Nav.Link>
                </Nav>
               </Navbar.Collapse> 
                <Nav className="justify-content-end">
                <NavDropdown title= {<><PersonCircle height={45}  width={50} /> {props.Username} </>} >
                        <NavDropdown.Item href="/login">login</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            
        </Navbar>
    );
}

export default NavBar;