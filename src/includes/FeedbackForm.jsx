import { useState, useContext, useEffect } from "react"
import Card from "./Card"
import Button from "./Button";
import RatingSelect from "./RatingSelect";
import FeedbackContext from "../context/FeedbackContext";

function Feedbackform() {
  let [text, setText] = useState("");
  let [rating, setRating] = useState(10);
  let [btnDisabled, setBtnDisabled] = useState(true);
  let [message, setMessage] = useState(" ");

  const {addFeedBack, feedbackEdit, updateItem} = useContext(FeedbackContext)

  useEffect(()=>{
  if(feedbackEdit.edit === true){
    setBtnDisabled(false)
    setText(feedbackEdit.item.text)
  }
  },[feedbackEdit])
  const handleTextChange = (e) => {
    if (text === " ") {
      setBtnDisabled(true);
      setMessage(null);
    } else if (text !== " " && text.trim().length <= 10) {
      setMessage("Text must be at least 10 characters");
      setBtnDisabled(true);
    } else {
      setBtnDisabled(false);
      setMessage(null);
    }
    setText(e.target.value);
  }
  const handleSubmit = (e)=>{
    e.preventDefault()
    if(text.trim().length>10){
      const newFeedBack = {
        text, rating
      }
      if(feedbackEdit.edit === true){
        updateItem(feedbackEdit.item.id, newFeedBack)
      }else{
      addFeedBack(newFeedBack);
      }
      setText(" ");
    }
  }
  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <h2>How would you rate your service with us?</h2>
        <RatingSelect select={(rating)=> setRating(rating)}/>
        <div className="input-group">
          <input type="text" onChange={handleTextChange} placeholder="Write a review" value={text} />
          <Button type="submit" version={"secondary"} isDisabled={btnDisabled}>Send</Button>
        </div>
        {message && <div className="message">{message}</div>}
      </form>
    </Card>
  )
}

export default Feedbackform
