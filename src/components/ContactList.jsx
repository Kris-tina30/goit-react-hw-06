import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import Contact from './Contact';
import { deleteContact } from '../redux/contactsSlice';

function ContactList() {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts.contacts);
  const filter = useSelector(state => state.filter.filter);

  const visibleContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase()),
  );

  const onDeleteContact = contactId => {
    dispatch(deleteContact(contactId));
  };

  return (
    <ul>
      {visibleContacts.map(contact => (
        <li key={contact.id}>
          <Contact contacts={contact} onDeleteContact={onDeleteContact} />
        </li>
      ))}
    </ul>
  );
}

export default ContactList;
