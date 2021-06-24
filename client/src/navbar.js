import React, { useContext } from 'react';
import { Navbar, Nav, NavDropdown, } from 'react-bootstrap'
import { PersonCircle } from 'react-bootstrap-icons';
import { NavLink } from 'react-router-dom'
import { UserContext } from './userContext';

function NavBar(props) {
    const context = useContext(UserContext)
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky='top'>
            <Navbar.Brand href="#home">Lap's Survey</Navbar.Brand>


            {context.loggedIn ? <>
                <Navbar.Collapse id="responsive-navbar-nav"  >
               

                <Nav className="mr-auto" variant='pills'>
                    <NavLink to="/addsurvey">New survey </NavLink>
                    <NavLink to="/addsurvey">Pricing</NavLink>


                    <Nav.Link href="#deets">More deets</Nav.Link>
                    <Nav.Link eventKey={2} href="#memes">
                        Dank memes
                    </Nav.Link>
                </Nav> 
                </Navbar.Collapse>
                <Nav className="justify-content-end">
                    <NavDropdown title={<><PersonCircle height={45} width={50} /> {props.Username} </>} >
                        <NavDropdown.Item onClick={() => { props.logout() }}> logout</NavDropdown.Item>
                    </NavDropdown>
                </Nav>  </>
                : <>                <Navbar.Collapse id="responsive-navbar-nav"  >
                </Navbar.Collapse>

                    <Nav className="justify-content-end">
                        <NavDropdown title={<><PersonCircle height={45} width={50} /> {props.Username} </>} >
                            <NavDropdown.Item ><NavLink to="/login"> login</NavLink></NavDropdown.Item>
                        </NavDropdown>
                    </Nav>

                </>
            }
        </Navbar>
    );
}

export default NavBar;