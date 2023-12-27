import { createContext, useState, useEffect } from 'react'
import {v4 as uuidv4} from 'uuid'

const FeedbackContext = createContext()

export const FeedbackProvider = ({ children }) => {
  const [feedback,setFeedback] = useState([
    {
      id:1,
      text: 'this is from context',
      rating:10,

    }
  ]) 
  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false,
  })
  const updateFeedback = (id,updItem) =>{
    setFeedback(feedback.map((item)=> item.id === id ? {...item,...updItem} : item))
  }
  const editFeedback = (item) => {
    setFeedbackEdit({
      item,
      edit: true,
    })
  }
  const addFeedback =(newFeedback) =>{
    newFeedback.id =uuidv4()
    setFeedback([newFeedback, ...feedback])
    }

  const deleteFeedback =(id) =>{
    if(window.confirm('Are u Sure to Delete?')){
   setFeedback(feedback.filter((item)=> item.id !==id))
    }
}
  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        // isLoading,
        deleteFeedback,
        addFeedback,
        editFeedback,
        feedbackEdit,
        updateFeedback,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  )
}
export default FeedbackContext;