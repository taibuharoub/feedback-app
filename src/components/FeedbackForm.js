import { useState, useContext } from "react";

import FeedbackContext from "../context/FeedbackContext";
import Button from "../shared/Button";
import Card from "../shared/Card";
import RatingSelect from "./RatingSelect";

function FeedbackForm() {
  const [text, setText] = useState("");
  const [rating, setRating] = useState(10);
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [message, setMessage] = useState("");

  const { addFeedbackHandler } = useContext(FeedbackContext);

  const reviewChangeHandle = (event) => {
    if (text === "") {
      setBtnDisabled(true);
      setMessage(null);
    } else if (text !== "" && text.trim().length <= 10) {
      setMessage("Review must be at least 10 characters");
      setBtnDisabled(true);
    } else {
      setMessage(null);
      setBtnDisabled(false);
    }
    setText(event.target.value);
  };
  const submitHandler = (event) => {
    event.preventDefault();
    if (text.trim().length > 10) {
      const newFeedback = {
        text,
        rating,
      };
      //   console.log(newFeedback);
      addFeedbackHandler(newFeedback);
      setText("");
    }
  };
  return (
    <Card>
      <form onSubmit={submitHandler}>
        <h2>How would you rate your service with us?</h2>
        {/* select component  */}
        <RatingSelect select={(rating) => setRating(rating)} />
        <div className="input-group">
          <input
            type="text"
            placeholder="Write your review"
            value={text}
            onChange={reviewChangeHandle}
          />
          <Button type="submit" isDisabled={btnDisabled}>
            Send
          </Button>
        </div>
        {message && <div className="message">{message}</div>}
      </form>
    </Card>
  );
}

export default FeedbackForm;
