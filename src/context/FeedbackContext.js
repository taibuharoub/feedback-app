import { createContext, useState } from "react";

import FeedbackData from "../data/FeedbackData";

// const initialFeedback = [
//   {
//     id: 1,
//     text: "This item is from context",
//     rating: 10,
//   },
// ];

const feedbackEditState = {
  item: {},
  edit: false,
};

const FeedbackContext = createContext({
  feedback: FeedbackData,
  feedbackEdit: feedbackEditState,
  deleteFeedback: (id) => {},
  addFeedbackHandler: (newFeedback) => {},
  editFeedbackHandler: (itemData) => {},
  updateFeedbackHandler: (id, updatedItem) => {},
});

export const FeedbackProvider = ({ children }) => {
  const [feedback, setFeedback] = useState(FeedbackData);

  const [feedbackEdit, setFeedbackEdit] = useState(feedbackEditState);

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

  // Update feedback item
  const updateFeedbackHandler = (id, updatedItem) => {
    console.log(id, updatedItem);
    setFeedback(
      feedback.map((item) =>
        item.id === id ? { ...item, ...updatedItem } : item
      )
    );
  };

  // set item to be updated
  const editFeedbackHandler = (item) => {
    setFeedbackEdit({
      item,
      edit: true,
    });
  };

  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        feedbackEdit,
        deleteFeedback,
        addFeedbackHandler,
        editFeedbackHandler,
        updateFeedbackHandler,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContext;
