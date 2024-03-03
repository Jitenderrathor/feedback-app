import { v4 as uuidv4 } from "uuid";
import { createContext, useState, useEffect } from "react";

const FeedbackContext = createContext()

export const FeedbackProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true)
    const [feedback, setFeedback] = useState([])
    const [feedbackEdit, setFeedbackEdit] = useState({
        item: {},
        edit: false,
    })

    useEffect(() => {
        fetchFeedback()
    }, [])

    const fetchFeedback = async () => {
        const response = await fetch(`http://localhost:5000/feedback`)
        const data = await response.json()
        setFeedback(data)
        setIsLoading(false)
    }
    const addFeedBack = async (newFeed) => {
        const res = await fetch(`http://localhost:5000/feedback`, {
            method:"POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newFeed)
        })
        const data = await res.json();
        setFeedback([data, ...feedback]);
    };

    const updateItem = async (id, updItem) => {
        const res = await fetch(`http://localhost:5000/feedback/${id}`, {
            method:"PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updItem)
        })
        const data = await res.json();

        setFeedback(
            feedback.map((item) => item.id === id ? { ...item, ...data } : item)
        )
    }

    const deleteFeedback = async (id) => {
        if (window.confirm("Are you sure you want to delete?")) {
            await fetch(`http://localhost:5000/feedback/${id}`, {method:"DELETE"})
            setFeedback(feedback.filter((item) => item.id !== id));
        }
    };

    const editFeedback = (item) => {
        setFeedbackEdit({
            item,
            edit: true,
        })
    }
    return <FeedbackContext.Provider value={{ feedback, feedbackEdit, isLoading, deleteFeedback, addFeedBack, editFeedback, updateItem }}>
        {children}
    </FeedbackContext.Provider>
}

export default FeedbackContext