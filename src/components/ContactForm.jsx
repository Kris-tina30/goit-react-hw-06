import React from 'react';
import { nanoid } from 'nanoid';
import { useSelector, useDispatch } from 'react-redux';
import css from './ContactForm.module.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { addContact } from '../redux/contactsSlice';

const MAX_CHAR_VALIDATION = 50;
const MIN_CHAR_VALIDATION = 3;

const contactSchema = Yup.object().shape({
  name: Yup.string()
    .min(MIN_CHAR_VALIDATION, `Your name must be more than ${MIN_CHAR_VALIDATION} characters!`)
    .max(MAX_CHAR_VALIDATION, `Your name must be less than ${MAX_CHAR_VALIDATION} characters!`)
    .required('Name is required!'),

  number: Yup.string()
    .min(
      MIN_CHAR_VALIDATION,
      `Your phone number must be more than ${MIN_CHAR_VALIDATION} characters!`,
    )
    .max(
      MAX_CHAR_VALIDATION,
      `Your phone number must be less than ${MAX_CHAR_VALIDATION} characters!`,
    )
    .required('Phone number is required!'),
});

const FORM_INITIAL_VALUES = {
  name: '',
  number: '',
};

function ContactForm() {
  const contacts = useSelector(state => state.contacts.contacts);
  const dispatch = useDispatch();

  const onAddContact = formData => {
    const finalContact = {
      ...formData,
      id: nanoid(),
    };

    dispatch(addContact(finalContact));
  };

  const handleSubmit = (values, actions) => {
    console.log('values: ', values);
    onAddContact(values);
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={FORM_INITIAL_VALUES}
      validationSchema={contactSchema}
      onSubmit={handleSubmit}
    >
      <Form className={css.contactForm}>
        <div className={css.contactData}>
          <label>
            <span>Name</span>
          </label>
          <Field type="text" name="name" />
          <ErrorMessage component="p" name="name" />
        </div>
        <div className={css.contactData}>
          <label>
            <span>Number</span>
          </label>
          <Field type="tel" name="number" />
        </div>
        <button type="submit" className={css.buttonAdd}>
          Add contact
        </button>
      </Form>
    </Formik>
  );
}

export default ContactForm;
