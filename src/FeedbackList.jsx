// import {motion, AnimatePresence} from "framer-motion"
import Feedback from "./Feedback"
import { useContext } from "react"
import FeedbackContext from "./context/FeedbackContext"
import Spinner from "./includes/Spinner"
function FeedbackList() {
    const {feedback, isLoading} = useContext(FeedbackContext)
    if (!isLoading && (!feedback || feedback.length === 0)) {
        return <p> No Feedback Yet</p>
    }
    // else{
    //     console.log(feedback);
    // }
    return isLoading ? <Spinner/>:<>
        <div className="feedback-list">
            {/* <AnimatePresence>
            {feedback.map((item) => (
                    <motion.div
                    key={item.id}
                    initial={{opacity:0}}
                    animate={{opacity:1}}
                    exit={{opacity:1}}
                    >
                        <Feedback key={item.id} item={item} handleDelete={handleDelete}/>
                    </motion.div>
            ))}
            </AnimatePresence> */}
            {feedback.map((item) => (
                        <Feedback key={item.id} item={item}/>
            ))}
        </div>
    </>
}

export default FeedbackList