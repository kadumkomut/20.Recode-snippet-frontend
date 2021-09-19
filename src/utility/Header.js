import {useState, useContext, useEffect } from 'react'
import {Navbar, Nav, Container,NavDropdown, InputGroup,FormControl, Modal,Button, Badge  } from 'react-bootstrap'
import { useAuthState } from 'react-firebase-hooks/auth';
import { NavLink } from 'react-router-dom';
import { signOut } from '../authentication';
import { FirebaseContext } from '../firebase'
import brain from '../images/brain.png'
import '../styles/header.css'

function Header() {
    const firebase = useContext(FirebaseContext);
    const [user] = useAuthState(firebase.auth);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" sticky="top" variant="dark">
            <Container>
            <Navbar.Brand>
                <NavLink  activeStyle={{color:"white"}} className="active d-flex  " to="/">
                    <img src={brain} style={{width:"30px",height:"30px"}}/> &nbsp;Recode Snippet
                </NavLink>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                    {user&&<Nav.Link  onClick={handleShow}>
                        <i className="fas fa-search"></i> Search
                    </Nav.Link>}
                    <Nav.Link>
                        <NavLink  activeStyle={{color:"white"}} className="active" to="/snippet">
                            <i className="fas fa-code"></i> Snippet 
                        </NavLink>
                    </Nav.Link>
                    <Nav.Link>
                        <NavLink  activeStyle={{color:"white"}} className="active" to="/addcode">
                           <i className="fas fa-plus-circle"></i> Add
                        </NavLink>
                    </Nav.Link>
                    {user&&<NavDropdown title="Options" drop="left"  id="navbarScrollingDropdown">
                        <NavDropdown.Item onClick={()=>signOut(firebase)}>
                            {user&&<><i className="fas fa-sign-out-alt"></i> Logout</>}
                        </NavDropdown.Item>
                    </NavDropdown>}
                </Nav>
                <Nav>
                    <Nav.Link >
                        <NavLink  activeStyle={{color:"white"}} className="active d-flex" to="/profile">
                            {user&&<><img src={user.photoURL} style={{width:"24px",height:"24px",borderRadius:"50%"}}/> 
                            &nbsp;{user.displayName}</>}
                        </NavLink>
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
            </Container>
            {/* modal for search */}
            <>
                <Modal show={show} onHide={handleClose}>
                <Modal.Header >
                    <Modal.Title>Snippet Search</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <InputGroup>
                    <FormControl id="inlineFormInputGroupUsername" placeholder="search..." />
                    <InputGroup.Text style={{background:"#343a40",color:"white"}}><i className="fas fa-search-plus"></i></InputGroup.Text>
                </InputGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" size="sm" onClick={handleClose}>Close</Button>
                    <Button variant="primary" size="sm">Search</Button>
                </Modal.Footer>
                </Modal>
            </>
        </Navbar>
    )
}


export default Header
