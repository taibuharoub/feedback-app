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
    const response = await fetch("/feedback?_sort=id&_order=desc");
    const data = await response.json();
    setFeedback(data);
    setIsLoading(false);
  };

  const deleteFeedback = async (id) => {
    if (window.confirm("Are you sure you want to delete this feedback?")) {
      await fetch(`/feedback/${id}`, { method: "DELETE" });
      setFeedback(feedback.filter((item) => item.id !== id));
    }
  };

  const addFeedbackHandler = async (newFeedback) => {
    const response = await fetch("/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newFeedback),
    });

    const data = await response.json();

    // don't manipulate state directly, make a copy first
    setFeedback([data, ...feedback]);
  };

  // Update feedback item
  const updateFeedbackHandler = async (id, updatedItem) => {
    console.log(id, updatedItem);
    const response = await fetch(`/feedback/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedItem),
    });
    const data = await response.json();

    setFeedback(
      feedback.map((item) => (item.id === id ? { ...item, data } : item))
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
