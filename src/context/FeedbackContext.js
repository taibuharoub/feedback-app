import { createContext, useState, useEffect } from "react";

const feedbackEditState = {
  item: {},
  edit: false,
};

const FeedbackContext = createContext({
  feedback: [],
  feedbackEdit: feedbackEditState,
  deleteFeedback: (id) => {},
  addFeedbackHandler: (newFeedback) => {},
  editFeedbackHandler: (itemData) => {},
  updateFeedbackHandler: (id, updatedItem) => {},
  isLoading: true,
});

export const FeedbackProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [feedback, setFeedback] = useState([]);

  const [feedbackEdit, setFeedbackEdit] = useState(feedbackEditState);

  useEffect(() => {
    fetchFeedback();
  }, []);

  // fetech feedback
  const fetchFeedback = async () => {
    const response = await fetch(
      "http://localhost:5000/feedback?_sort=id&_order=desc"
    );
    const data = await response.json();
    setFeedback(data);
    setIsLoading(false);
  };

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
        isLoading,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContext;
