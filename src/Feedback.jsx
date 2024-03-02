import {FaTimes,FaEdit} from 'react-icons/fa'
import { useContext } from 'react';
import Card from "./includes/Card";
import FeedbackContext from './context/FeedbackContext';


export default function Feedback({item}){
    const {deleteFeedback, editFeedback} = useContext(FeedbackContext)
    return <>
     <Card reverse={false}>
        <div className="num-display">{item.rating}</div>
        <button className="edit">
            <FaEdit onClick={()=> editFeedback(item)} color='purple'/>
        </button>
        <button className="close">
            <FaTimes onClick={()=> deleteFeedback(item.id)} color='purple'/>
        </button>
        <div className="text-display">{item.text}</div>
    </Card>
    </>
}
