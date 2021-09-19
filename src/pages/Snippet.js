import React, { useEffect, useState } from 'react'
import { Categories } from '.';
import {Container,Accordion,Badge,Card,ButtonGroup,Button, ListGroup} from 'react-bootstrap'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { a11yDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import '../styles/snippet.css'
import Spinner from '../spinner'
import axios from 'axios';
import { useHistory,useLocation } from 'react-router';
import { deleteSnippet } from '../api';

function Snippet() {
    const [snippetData, setSnippetData] = useState([]);
    const history = useHistory();
    const query = useQuery();
    useEffect(()=>{
        const fetch = async() =>{
            // for all
            let url = `https://recode-snippet.herokuapp.com/snippet/${localStorage.getItem('userid')}`
            // for specific tags
            if(query.get('search')){
                url = `https://recode-snippet.herokuapp.com/snippet/${localStorage.getItem('userid')}/search/${query.get('search')}`;
            }
            await axios.get(url)
            .then(res=>{
                setSnippetData(res.data);
            })
            .catch(err=>{
                console.log(err);
            })
        }
        fetch();
    },[query.get('search')]);

    const editSnippet = (id) =>{
        return history.push(`/addcode?id=${id}`);
    }
    const deleteSnippetCode =  (id,title,index)=>{
         deleteSnippet(id,title,index,snippetData,setSnippetData);
    }
    return (
        <Container fluid="sm" className="spinner__container">

            <Categories />  

            <ListGroup style={{marginTop:"15px"}} as="ul" variant="flush">
            <Accordion>
                {
                    snippetData?
                    snippetData.map((value,index)=>(
                        <ListGroup.Item key={value._id}  style={{borderBottom:'4px solid grey'}}>   
                            <Accordion.Toggle as={Card.Header} 
                                style={{cursor:"pointer",textAlign:"center",background:"transparent",border:0,fontWeight:"bold",color:"grey"}} 
                                eventKey={value._id}>
                                <span style={{textTransform:"capitalize"}}>{value.title}</span> &nbsp;
                                <i className="fas fa-chevron-down"></i> &nbsp;
                                <Badge style={{border:'1px solid #8e44ad',color:'#8e44ad'}}>tags - {value.tags}</Badge>&nbsp;&nbsp;
                                <Badge style={{border:'1px solid #8e44ad',color:'#8e44ad'}}>language - {value.language}</Badge>&nbsp;&nbsp;
                                <Badge style={{border:'1px solid #8e44ad',color:'#8e44ad'}}>{value.date}</Badge>
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey={value._id}>
                                <>
                                    <SyntaxHighlighter language={value.language} style={a11yDark}>
                                        {value.snippet}
                                    </SyntaxHighlighter>
                                    <div style={{display:'flex',justifyContent:"center"}}>
                                        <ButtonGroup size="sm" style={{marginTop:"10px",marginBottom:"10px"}}>
                                            <Button variant="secondary" className="rounded"
                                                onClick={() =>{navigator.clipboard.writeText(value.snippet)}}>
                                                <i className="fas fa-copy"></i> &nbsp;Copy
                                            </Button>&nbsp;&nbsp;&nbsp;
                                            <Button variant="success" className="rounded" onClick={()=>editSnippet(value._id)}>
                                                <i className="fas fa-edit"></i> &nbsp;Edit
                                            </Button>
                                            &nbsp;&nbsp;&nbsp;
                                            <Button variant="danger" className="rounded" onClick={()=>deleteSnippetCode(value._id,value.title,index)}>
                                                <i className="fas fa-trash-alt"></i> &nbsp;Delete
                                            </Button>
                                        </ButtonGroup>
                                    </div>
                                </>
                            </Accordion.Collapse>
                        </ListGroup.Item>
                    )):<Spinner />
                }
                
            </Accordion>
            </ListGroup>
        </Container>
    )
}

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export default Snippet
