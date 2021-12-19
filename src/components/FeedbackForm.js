import { useState } from "react";
import Button from "../shared/Button";
import Card from "../shared/Card";

function FeedbackForm() {
  const [text, setText] = useState("");

  const reviewChangeHandle = (event) => {
    setText(event.target.value);
  };
  return (
    <Card>
      <form>
        <h2>How would you rate your service with us?</h2>
        {/* select component  */}
        <div className="input-group">
          <input
            type="text"
            placeholder="Write your review"
            value={text}
            onChange={reviewChangeHandle}
          />
          <Button type="submit" version="secondary">
            Send
          </Button>
        </div>
      </form>
    </Card>
  );
}

export default FeedbackForm;
