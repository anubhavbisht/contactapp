import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./Header";
import ContactList from "./ContactList";
import AddContact from "./AddContact";
import { empty, uuid } from "uuidv4";
import api from "../api/contacts";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ContactDetail from "./ContactDetail";
import EditContact from "./EditContact";
function App() {
  const localstoragekey = "contacts";
  let [contacts, usecontact] = useState([]);
  let [search, setsearch] = useState([]);
  let [searchresult, setresult] = useState([]);

  const retrievecontacts = async () => {
    const response = await api.get("/contacts");
    return response.data;
  };
  useEffect(() => {
    const getcontacts = async () => {
      const allcontacts = await retrievecontacts();
      if (allcontacts) usecontact(allcontacts);
    };
    getcontacts();
    // const retrievecontacts = JSON.parse(localStorage.getItem(localstoragekey));
    // if (retrievecontacts) usecontact(retrievecontacts);
  }, []);
  useEffect(() => {
    // localStorage.setItem(localstoragekey, JSON.stringify(contacts));
  }, [contacts]);

  let addc = async (contact) => {
    console.log(contact);
    const request = {
      id: uuid(),
      ...contact,
    };
    const response = await api.post("/contacts", request);
    usecontact([...contacts, response.data]);
    // usecontact([...contacts, { id: uuid(), ...contact }]);
  };
  let updatecontact = async (contact) => {
    const res = await api.put(`/contacts/${contact.id}`, contact);
    let { id, email, name } = res.data;
    usecontact(
      contacts.map((contact) => {
        return contact.id === id ? { ...res.data } : contact;
      })
    );
  };
  let removecontacts = async (id) => {
    await api.delete(`/contacts/${id}`);
    let newcontacts = contacts.filter((contact) => {
      return contact.id !== id;
    });
    usecontact(newcontacts);
  };
  const searchhandler = (c) => {
    setsearch(c);
    if (c !== "") {
      const newcontactlist = contacts.filter((con) => {
        return Object.values(con)
          .join(" ")
          .toLowerCase()
          .includes(c.toLowerCase());
      });
      console.log(newcontactlist);
      setresult(newcontactlist);
    } else {
      setresult(contacts);
    }
  };
  return (
    <div className="ui container">
      <Header />
      <Router>
        <Switch>
          <Route
            path="/add"
            exact
            render={(props) => <AddContact {...props} addc={addc} />}
          />
          <Route
            path="/"
            exact
            render={(props) => (
              <ContactList
                {...props}
                contacts={search.length < 1 ? contacts : searchresult}
                removecontacts={removecontacts}
                search={search}
                searchhandler={searchhandler}
              />
            )}
          />
          <Route
            path="/contact/:id/:name/:email"
            exact
            component={ContactDetail}
          />
          <Route
            path="/edit"
            exact
            render={(props) => (
              <EditContact {...props} updatecontact={updatecontact} />
            )}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
