import React, { useContext } from 'react';
import { Navbar, Nav, NavDropdown, } from 'react-bootstrap'
import { PersonCircle } from 'react-bootstrap-icons';
import { NavLink } from 'react-router-dom'
import { UserContext } from './userContext';
import './css/surver-question.css'

function NavBar(props) {
    const context = useContext(UserContext)
    return (
        <Navbar  collapseOnSelect expand="lg" bg="dark" variant="dark" sticky='top'>
            <Navbar.Brand href="#home"><h2>Lap's Survey</h2></Navbar.Brand>


            {context.loggedIn ? <>
                <Navbar.Collapse id="responsive-navbar-nav"  className="navbar1 nav-list" >
               

                <Nav    >
                    <NavLink to="/addsurvey">New survey </NavLink>
                    <NavLink to="/addsurvey">Pricing</NavLink>
                </Nav> 
                </Navbar.Collapse>
                <Nav bsPrefix='right-nav'>
                    <NavDropdown title={<><PersonCircle height={45} width={50} /> {props.Username} </>} >
                        <NavDropdown.Item onClick={() => { props.logout() }}> logout</NavDropdown.Item>
                    </NavDropdown>
                </Nav>  </>
                : <>                <Navbar.Collapse id="responsive-navbar-nav"  >
                </Navbar.Collapse>

                    <Nav bsPrefix='right-nav' >
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