import React, { useEffect, useState } from 'react'
import { Categories } from '.';
import {Container,Accordion,Badge,Card,ButtonGroup,Button, ListGroup, FormControl} from 'react-bootstrap'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { a11yDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import '../styles/snippet.css'
import Spinner from '../spinner'
import axios from 'axios';
import { useHistory } from 'react-router';
import { deleteSnippet } from '../api';
import Swal from 'sweetalert2';

function Snippet() {
    const [snippetData, setSnippetData] = useState([]);
    const [dataLoading, setDataLoading] = useState(true);
    const history = useHistory();
    useEffect(()=>{
        const fetch = async() =>{
            setDataLoading(true);
            // for all
            let url = `https://recode-snippet.herokuapp.com/snippet/${localStorage.getItem('userid')}`
            await axios.get(url)
            .then(res=>{
                setDataLoading(false)
                setSnippetData(res.data);
            })
            .catch(err=>{
                setDataLoading(false);
                console.log(err);
            })
        }
        fetch();
    },[]);

    const copyToClipboard = (value) =>{
        navigator.clipboard.writeText(value)
        Swal.fire({
            title : "Copied",
            icon: "success"
        })
    }
    const editSnippet = (id) =>{
        return history.push(`/addcode?id=${id}`);
    }
    const deleteSnippetCode =  (id,title,index)=>{
         deleteSnippet(id,title,index,snippetData,setSnippetData);
    }
    return (
        <Container fluid="sm" className="spinner__container">

            <SearchInput setSnippetData={setSnippetData} setDataLoading={setDataLoading}/>

            <Categories setSnippetData={setSnippetData} setDataLoading={setDataLoading}/>  

            <ListGroup style={{marginTop:"15px"}} as="ul" variant="flush">
            <Accordion>
                {dataLoading?<Spinner/>:
                    snippetData&&snippetData.map((value,index)=>(
                        <CodeAccordionList key={value.id}
                            value={value} 
                            copyToClipboard={copyToClipboard} 
                            editSnippet={editSnippet}
                            deleteSnippetCode={deleteSnippetCode}
                            index={index}
                            />
                    ))
                }
            </Accordion>
            </ListGroup>
        </Container>
    )
}

const CodeAccordionList = ({value,copyToClipboard,editSnippet,deleteSnippetCode,index}) =>{
    return (
            <ListGroup.Item  style={{borderBottom:'4px solid grey'}}>   
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
                                    onClick={() =>copyToClipboard(value.snippet)}>
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
    );
}

const SearchInput = ({setSnippetData,setDataLoading}) => {
    const [searchValue, setSearchValue] = useState("");
    const searchSnippet = async() =>{
        if(searchValue==="") return;
        setDataLoading(true);
        await axios.post('https://recode-snippet.herokuapp.com/search',{
            searchValue,
            userId : localStorage.getItem('userid')
        }).then(res=>{
            if(res.data.message!=="success"){
                setDataLoading(false);
                return;
            }
            setSnippetData(res.data.data);
            setDataLoading(false);
        })
    }
    return (<div style={{marginTop:"15px",display:"flex"}}>
        <FormControl  value={searchValue} onChange={(e)=>setSearchValue(e.target.value)} placeholder="search by title..."/>
        <Button onClick={searchSnippet}>Search</Button>
        </div>
    );
}

export default Snippet
