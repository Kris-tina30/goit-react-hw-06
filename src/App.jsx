import { useEffect, useState } from 'react';

import { nanoid } from 'nanoid';
import { useSelector, useDispatch } from 'react-redux';
import './App.css';
import ContactList from './components/ContactList';
import SearchBox from './components/SearchBox';
import ContactForm from './components/ContactForm';

import initialContacts from './contacts.json';
import { addContact, deleteContact, setFilter } from './redux/contacts/contactsReducer';

function App() {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contact.contacts);
  const filter = useSelector(state => state.contact.filter);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const onAddContact = formData => {
    const finalContact = {
      ...formData,
      id: nanoid(),
    };

    dispatch(addContact(finalContact));
  };

  const onDeleteContact = contactId => {
    dispatch(deleteContact(contactId));
  };

  const visibleContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase()),
  );

  const onChangeFilter = event => {
    dispatch(setFilter(event.target.value));
  };

  return (
    <div>
      <h1>Phonebook</h1>

      <ContactForm onAddContact={onAddContact} />
      <SearchBox value={filter} onChange={onChangeFilter} />

      <ContactList contacts={visibleContacts} onDeleteContact={onDeleteContact} />
    </div>
  );
}

export default App;
