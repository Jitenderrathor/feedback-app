import { v4 as uuidv4 } from "uuid";
import { createContext, useState } from "react";

const FeedbackContext = createContext()

export const FeedbackProvider = ({children})=>{
    const  [feedback,setFeedback] = useState([
        { id:1, text:"This item is from context", rating:10}, 
        { id:2, rating:7, text:"Lorem Ipsum is simply dummy text of the printing and typesetting industry."},
        { id:3, rating:5, text:"Lorem Ipsum is simply dummy text of the printing and typesetting industry."},
        { id:4, rating:9, text:"Lorem Ipsum is simply dummy text of the printing and typesetting industry."},
        { id:5, rating:10, text:"Lorem Ipsum is simply dummy text of the printing and typesetting industry."},
    ])

    const [feedbackEdit, setFeedbackEdit] = useState({
        item:{},
        edit:false,
    })

    const addFeedBack = (newFeed) => {
        newFeed.id = uuidv4();
        console.log(newFeed);
        setFeedback([newFeed, ...feedback]);
    };

    const updateItem = (id, updItem)=>{
        setFeedback(
            feedback.map((item)=>item.id === id ? {...item,...updItem}: item)
        )
    }

    const deleteFeedback = (id) => {
        if (window.confirm("Are you sure you want to delete?")) {
            setFeedback(feedback.filter((item) => item.id !== id));
        }
    };

    const editFeedback = (item)=>{
        setFeedbackEdit({
            item,
            edit:true,
        })
    }
    return <FeedbackContext.Provider value={{feedback, feedbackEdit, deleteFeedback, addFeedBack, editFeedback, updateItem}}> 
        {children}
    </FeedbackContext.Provider>
}

export default FeedbackContext