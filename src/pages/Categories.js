import {Card,Badge} from 'react-bootstrap'
import {useState} from 'react';
import axios from 'axios';

function Categories({setSnippetData,setDataLoading}) {
    const [tagsList, setTagsList] = useState(
        ['express','django','github','algorithm','datastructure','flask','styles','php','others','react']
    )
    const searchTags = async(tags) =>{
        setDataLoading(true);
        const url = `https://recode-snippet.herokuapp.com/snippet/${localStorage.getItem('userid')}/search/${tags}`
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

    return (
        <Card className="shadow-sm spinner__card__container">
                <Card.Body>
                    <span style={{color:"grey"}}>Search by tags : </span>&nbsp;
                    {
                    tagsList.map((value,index)=>(
                        <Badge onClick={()=>searchTags(value)} key={index} className="spinner__badge" >{value}</Badge>
                    ))
                    }
                </Card.Body>
            </Card>
    )
}

export default Categories
