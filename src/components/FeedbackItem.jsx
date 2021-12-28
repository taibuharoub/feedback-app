import { useContext } from "react";
import {FaTimes, FaEdit} from "react-icons/fa";
import PropTypes from 'prop-types'

import FeedbackContext from "../context/FeedbackContext";
import Card from "../shared/Card";
function FeedbackItem({item}) {
  const {deleteFeedback, editFeedbackHandler} = useContext(FeedbackContext)
  return (
    <Card>
      <div className="num-display">{item.rating}</div>
      <button className="close" onClick={() => deleteFeedback(item.id)}><FaTimes color="purple"/></button>
      <button className="edit" onClick={() => editFeedbackHandler(item)} ><FaEdit color="purple" /></button>
      <div className="text-display">{item.text}</div>
    </Card>
  );
}

FeedbackItem.propTypes = {
  item: PropTypes.object.isRequired
}

export default FeedbackItem;
