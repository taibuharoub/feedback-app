// fa - since we are using the font awesome library
import { FaQuestion } from "react-icons/fa";
import { Link } from "react-router-dom";
function AboutIconLink() {
  return (
    <div className="about-link">
      <Link to="/about">
        <FaQuestion />
      </Link>
      {/* <Link to={{ pathname: "/about", search: "?sort=name", hash: "#hello" }}>
        <FaQuestion />
      </Link> */}
    </div>
  );
}

export default AboutIconLink;
