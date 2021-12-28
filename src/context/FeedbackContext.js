import { createContext, useState } from "react";

import FeedbackData from "../data/FeedbackData";

// const initialFeedback = [
//   {
//     id: 1,
//     text: "This item is from context",
//     rating: 10,
//   },
// ];

const FeedbackContext = createContext({
  feedback: FeedbackData,
  deleteFeedback: (id) => {},
  addFeedbackHandler: (newFeedback) => {},
});

export const FeedbackProvider = ({ children }) => {
  const [feedback, setFeedback] = useState(FeedbackData);

  const deleteFeedback = (id) => {
    if (window.confirm("Are you sure you want to delete this feedback?")) {
      setFeedback(feedback.filter((item) => item.id !== id));
    }
  };

  const addFeedbackHandler = (newFeedback) => {
    console.log(newFeedback);
    console.log(Math.random().toString());
    // newFeedback.id = uuidv4()
    newFeedback.id = Math.random().toString();

    // don't manipulate state directly, make a copy first
    setFeedback([newFeedback, ...feedback]);
  };

  return (
    <FeedbackContext.Provider
      value={{ feedback, deleteFeedback, addFeedbackHandler }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContext;
