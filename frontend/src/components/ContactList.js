import React, { useRef } from "react";
import ContactCard from "./ContactCard";
import { Link } from "react-router-dom";
const ContactList = (props) => {
  const inputele = useRef("");
  const rendercontactlist = props.contacts.map((contact) => {
    return (
      <ContactCard
        contact={contact}
        deletecontact={props.removecontacts}
      ></ContactCard>
    );
  });
  const getSearch = () => {
    props.searchhandler(inputele.current.value);
  };
  return (
    <div className="main">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>Contact List</h2>
        <Link to="/add">
          <button className="ui button blue right">Add Contact</button>
        </Link>
      </div>
      <div className="ui search">
        <div className="ui icon input">
          <input
            type="text"
            placeholder="search contacts"
            className="prompt full"
            value={props.search}
            onChange={getSearch}
            ref={inputele}
          />
          <i className="search icon"></i>
        </div>
      </div>
      <div className="ui celled list">
        {rendercontactlist.length > 0
          ? rendercontactlist
          : "Dont write gibberish"}
      </div>
    </div>
  );
};
export default ContactList;
