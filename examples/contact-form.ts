/**
 * Example: Creating a Complete Contact Form
 * 
 * This example demonstrates how to create a contact form with various field types,
 * validation, and responsive layout configuration.
 */

import {
  createForm,
  addField,
  createTextField,
  createEmailField,
  createSelectField,
  createCheckboxField,
  createOptions,
  toJSON,
} from '../src/index';

// Create the base form
let contactForm = createForm('contact-form', {
  title: 'Contact Us',
  description: 'Get in touch with our team. We\'ll respond within 24 hours.',
});

// Add name field with layout
contactForm = addField(
  contactForm,
  createTextField('name', 'Your Name', {
    minLength: 1,
    maxLength: 100,
    placeholder: 'John Doe',
  }, {
    tooltip: 'Please enter your full name',
    layout: {
      width: {
        mobile: 'full',
        desktop: '1/2',
      },
    },
  })
);

// Add email field
contactForm = addField(
  contactForm,
  createEmailField('email', 'Email Address', {
    required: true,
    placeholder: 'you@example.com',
  }, {
    tooltip: 'We\'ll use this to respond to your inquiry',
    layout: {
      width: {
        mobile: 'full',
        desktop: '1/2',
      },
    },
  })
);

// Add subject dropdown
contactForm = addField(
  contactForm,
  createSelectField('subject', 'Subject', {
    required: true,
    placeholder: 'Select a subject',
    options: createOptions([
      { value: 'support', label: 'Technical Support' },
      { value: 'sales', label: 'Sales Inquiry' },
      { value: 'general', label: 'General Question' },
      { value: 'feedback', label: 'Feedback' },
    ]),
  })
);

// Add message field
contactForm = addField(
  contactForm,
  createTextField('message', 'Message', {
    minLength: 10,
    maxLength: 1000,
    multiline: true,
    placeholder: 'How can we help you?',
  }, {
    tooltip: 'Please provide details about your inquiry (min 10 characters)',
  })
);

// Add newsletter subscription checkbox
contactForm = addField(
  contactForm,
  createCheckboxField('subscribe', 'Subscribe to our newsletter', {})
);

// Export to JSON
const formJSON = toJSON(contactForm, true);

console.log('Contact Form JSON:');
console.log(formJSON);

// You can also save this to a file:
// import { writeFileSync } from 'fs';
// writeFileSync('./contact-form.json', formJSON);

export default contactForm;
