import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from "./components/Header"
import FeedbackList from './components/FeedbackList'
import FeedbackStats from './components/FeedbackStats'
import FeedbackForm from './components/FeedbackForm'
import FeedbackData from "./data/FeedbackData";
import { FeedbackProvider } from "./context/FeedbackContext";
import AboutPage from './pages/AboutPage'
import AboutIconLink from "./components/AboutIconLink";


function App() {
  //eslint-disable-next-line
const[feedback,setFeedback]=useState(FeedbackData)



    return(
        <FeedbackProvider>
        <Router>
        <Header />
        <div className="container">
          <Routes>
            <Route exact path="/" element={<>
              <FeedbackForm />
              <FeedbackStats  />
              <FeedbackList/>
            </>} />
  
            <Route path="/about" element={<AboutPage />} />
            {/* <Route exact path="/post/:id/:name"
              element={<Post />
              } 
              /> */}
          </Routes>
          <AboutIconLink/>
          
        </div>
      </Router>
      </FeedbackProvider>
    ) 
}
export default App;