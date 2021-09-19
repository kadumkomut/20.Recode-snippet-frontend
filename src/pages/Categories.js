import {Card,Badge} from 'react-bootstrap'
import {useState} from 'react';
import { useHistory } from 'react-router';

function Categories() {
    const [tagsList, setTagsList] = useState(
        ['express','django','github','algorithm','datastructure','flask','styles','php','others']
    )
    const history = useHistory();
    const searchTags = (tags) =>{
        history.push(`/snippet?search=${tags}`);
    }
    return (
        <Card className="shadow-sm spinner__card__container">
                <Card.Body>
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
