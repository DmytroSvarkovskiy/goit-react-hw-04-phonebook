import { Component } from 'react';
import { createGlobalStyle } from 'styled-components';
import { ContactForm } from './ContactForm/ContactForm';
import { Contaclist } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { nanoid } from 'nanoid';
const GlobalStyle = createGlobalStyle`
  ul,h1,h2,h3,h4,h5,h6,li,p{list-style:none;margin:0;padding:0;};
  body{
   margin-top:50px;
   display: flex;
   justify-content:center;
   align-items:center;
   color: '#010101'; 
  }
`;
const KEY_STORAGE = 'contacts';
export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };
  componentDidMount() {
    if (localStorage.getItem(KEY_STORAGE)) {
      this.setState({
        contacts: JSON.parse(localStorage.getItem(KEY_STORAGE)),
      });
    }
  }
  componentDidUpdate(_, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem(KEY_STORAGE, JSON.stringify(this.state.contacts));
    }
  }
  addContact = (values, { resetForm }) => {
    const newContact = { id: nanoid(3), ...values };
    const newContactName = newContact.name.toLowerCase();
    if (
      this.state.contacts.find(
        people => people.name.toLowerCase() === newContactName
      )
    ) {
      alert(`${newContact.name} is already in contact`);
    } else {
      this.setState(prevState => ({
        contacts: [newContact, ...prevState.contacts],
      }));
      resetForm();
    }
  };
  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  onFilterChange = e => {
    const filterWord = e.target.value.toLowerCase();
    this.setState({ filter: filterWord });
  };

  render() {
    const { filter, contacts } = this.state;
    const { addContact, onFilterChange, deleteContact } = this;
    const visibleContacts = contacts.filter(abonent =>
      abonent.name.toLowerCase().includes(filter)
    );

    return (
      <div>
        <GlobalStyle />
        <h1>PhoneBook</h1>
        <ContactForm onSubmit={addContact} />
        <h2>Contacts :</h2>
        {contacts.length === 0 ? (
          <h2>You have no contacts saved</h2>
        ) : (
          <>
            <Filter value={filter} onFilterChange={onFilterChange} />
            <Contaclist
              listAbonents={visibleContacts}
              onDeleteClick={deleteContact}
            />
          </>
        )}
      </div>
    );
  }
}
