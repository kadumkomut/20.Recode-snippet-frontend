import React from 'react'
import { Alert, ButtonGroup, Container,Button } from 'react-bootstrap'
import '../styles/home.css'

function Home() {
    return (
        <Container  className="home__container">
            <Alert variant="success">
                <Alert.Heading>Hey, nice to see you</Alert.Heading> 
                <p>
                    You have successfully entered the best code snippet saving site which gives you full control over your data.
                </p>
                <p>
                    Whenever in doubt, remember us.
                </p>
                <hr />
                <p className="mb-0">
                    MADE IN LOVE WITH MERN STACK AND ADDITIONALLY FIREBASE.
                </p>
                <ButtonGroup size="lg" bg="danger" style={{marginTop:"15px"}}>
                        <Button href="https://github.com/kadumkomut" className="home__github" target="_blank"><i className="fab fa-github"></i> </Button>&nbsp;&nbsp;
                        <Button href="https://www.facebook.com/kadum.komut.9" className="home__facebook" target="_blank" ><i className="fab fa-facebook"></i> </Button>&nbsp;&nbsp;
                        <Button href="mailto:kadumkomut2826@gmail.com" className="home__google" ><i className="fab fa-google"></i> </Button>&nbsp;&nbsp;
                        <Button className="home__linkedin" href="https://in.linkedin.com/in/kadum-komut-67023012b" target="_blank" ><i className="fab fa-linkedin"></i> </Button>
                </ButtonGroup>
            </Alert>
        </Container>
    )
}

export default Home
