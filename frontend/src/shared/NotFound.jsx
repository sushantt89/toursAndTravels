import React from "react";
import "./notFound.css";
import { Link } from "react-router-dom";

const NotFound = () => {

  return (
    <div className="card-inner-container">
      <div className="card-inner">
        <div className="front-content">
          <p>Search Not Found!</p>
        </div>
        <div className="back-content">
          <button className="button-notfound">
            <Link to={"/tours"} className="styled-link">Explore!</Link>
          </button>
          <p>You can always explore other destinations!</p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
