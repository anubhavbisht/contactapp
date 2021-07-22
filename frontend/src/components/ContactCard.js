import React from "react";
import user from "../images/user.png";
import { Link } from "react-router-dom";
const ContactCard = (props) => {
  const { id, email, name } = props.contact;
  return (
    <div className="item">
      <img className="ui avatar image" src={user} alt="user"></img>
      <div className="content">
        <Link to={`/contact/${id}/${name}/${email}`}>
          <div className="header">{name}</div>
          <div>{email}</div>
        </Link>
      </div>
      <i
        className="trash alternate outline icon"
        style={{ color: "red", marginTop: "7px" }}
        onClick={() => props.deletecontact(id)}
      ></i>
      <Link to={{ pathname: "edit", state: { contact: props.contact } }}>
        <i
          className="edit alternate outline icon"
          style={{ color: "blue", marginTop: "7px", marginRight: "7px" }}
        ></i>
      </Link>
    </div>
  );
};
export default ContactCard;
