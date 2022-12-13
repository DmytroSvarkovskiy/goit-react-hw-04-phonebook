import { useState, useEffect } from 'react';
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
export const App = () => {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(localStorage.getItem(KEY_STORAGE)) ?? [];
  });
  const [filters, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem(KEY_STORAGE, JSON.stringify(contacts));
  }, [contacts]);

  const addContact = (values, { resetForm }) => {
    const newContact = { id: nanoid(3), ...values };
    const newContactName = newContact.name.toLowerCase();
    if (contacts.find(people => people.name.toLowerCase() === newContactName)) {
      alert(`${newContact.name} is already in contact`);
    } else {
      setContacts([newContact, ...contacts]);
      resetForm();
    }
  };
  const deleteContact = id => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  const onFilterChange = e => {
    const filterWord = e.target.value.toLowerCase();
    setFilter(filterWord);
  };

  const visibleContacts = contacts.filter(abonent =>
    abonent.name.toLowerCase().includes(filters)
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
          <Filter value={filters} onFilterChange={onFilterChange} />
          <Contaclist
            listAbonents={visibleContacts}
            onDeleteClick={deleteContact}
          />
        </>
      )}
    </div>
  );
};
