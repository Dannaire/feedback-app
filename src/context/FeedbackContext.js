import { createContext, useState, useEffect} from 'react'
import {v4 as uuidv4} from 'uuid'

const FeedbackContext = createContext()

export const FeedbackProvider = ({ children }) => {
  const [feedback,setFeedback] = useState([]) 
  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false,
  })

useEffect(() => {
  fetchFeedback()
},[])
const fetchFeedback = async () => {
const response = await fetch(
  '/feedback?_sort=id&_order=desc'
)

    const data = await response.json();
    setFeedback(data);

}

 // update feedback item
 const updateFeedback = async (id, updItem) => {
  const response = await fetch(`/feedback/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updItem),
  });

  const data = await response.json();

  setFeedback(
    feedback.map((item) => (item.id === id ? { ...item, ...data } : item))
  );
};

useEffect(() => {
  fetchFeedback();
}, []);


  const editFeedback = (item) => {
    setFeedbackEdit({
      item,
      edit: true,
    })
  }
  // Add Feedback
  const addFeedback = async (newFeedback) => {
    const response = await fetch("/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newFeedback),
    });

    const data = await response.json();
    console.log(data);

    setFeedback([data, ...feedback]);
  };

  // Delete Feedback
  const deleteFeedback = async (id) => {
    if (window.confirm("Are you sure to delete this feedback?")) {
      await fetch(`/feedback/${id}`, { method: "DELETE" });
      setFeedback(feedback.filter((item) => item.id !== id));
    }
  };
  
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