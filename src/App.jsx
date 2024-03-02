import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Header from "./includes/Header";
import FeedbackList from "./FeedbackList";
import FeedbackStats from "./FeedbackStats";
import FeedbackForm from "./includes/FeedbackForm";
import AboutPage from "./pages/AboutPage";  // Import the AboutPage component
import AboutIconLink from "./includes/AboutIconLink";  // Import the AboutPage component
import { FeedbackProvider } from "./context/FeedbackContext";

function App() {
    return (
        <FeedbackProvider>
            <Router>
                <Header title="Feedback App Header" />
                <div className="container">
                    <Routes>
                        <Route exact path="/" element={
                            <>
                                <FeedbackForm />
                                <FeedbackStats />
                                <FeedbackList />
                            </>
                        }>

                        </Route>
                        <Route path="/about" element={<AboutPage />} />
                    </Routes>
                </div>
                <AboutIconLink />
            </Router>
        </FeedbackProvider>
    );
}

export default App;
