import React from "react";
import { Link } from "react-router-dom";
import user from "../images/download.png";
import { useParams } from "react-router";
const ContactDetail = (props) => {
  let { id, name, email } = useParams();

  return (
    <div className="main">
      <div className="ui card centered">
        <div className="image">
          <img src={user} alt="user" />
        </div>
        <div className="content">
          <div className="header">{name}</div>
          <div className="description">{email}</div>
        </div>
      </div>
      <div className="center-div asd">
        <Link to="/">
          <button className="ui button blue center">
            Back To Contact List
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ContactDetail;
