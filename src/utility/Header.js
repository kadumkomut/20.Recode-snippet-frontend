import axios from 'axios';
import {useState, useContext } from 'react'
import {Navbar, Nav, Container,NavDropdown,  Modal,InputGroup,Button,FormControl  } from 'react-bootstrap'
import { useAuthState } from 'react-firebase-hooks/auth';
import { NavLink,useHistory } from 'react-router-dom';
import { signOut } from '../authentication';
import { FirebaseContext } from '../firebase'
import brain from '../images/brain.png'
import '../styles/header.css'

function Header() {
    const firebase = useContext(FirebaseContext);
    const [user] = useAuthState(firebase.auth);
    const [searchValue, setSearchValue] = useState("");
    const history = useHistory();
    

    const searchSnippet = async() =>{
        if(searchValue==="") return;
        const res = await axios.post('http://localhost:5000/search',{
            searchValue
        })
        console.log(res.data);
    }
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
                    {user&&<Nav.Link>
                        <NavLink  activeStyle={{color:"white"}} className="active" to="/snippet">
                            <i className="fas fa-code"></i> Snippet 
                        </NavLink>
                    </Nav.Link>}
                    {user&&<Nav.Link>
                        <NavLink  activeStyle={{color:"white"}} className="active" to="/addcode">
                           <i className="fas fa-plus-circle"></i> Add
                        </NavLink>
                    </Nav.Link>}
                    <NavDropdown title="Options" drop="left"  id="navbarScrollingDropdown">
                        {user&&<NavDropdown.Item onClick={()=>signOut(firebase)}>
                            {user&&<><i className="fas fa-sign-out-alt"></i> Logout</>}
                        </NavDropdown.Item>}
                        {!user&&<NavDropdown.Item onClick={()=>history.push('/signin')}>
                            <i className="fas fa-sign-out-alt"></i> Login
                        </NavDropdown.Item>}
                    </NavDropdown>
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
            
        </Navbar>
    )
}



export default Header
