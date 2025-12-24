/**
 * Example: Job Application Form with Conditional Logic
 * 
 * This example demonstrates:
 * - Multiple field types
 * - Conditional dependencies
 * - File uploads
 * - Complex validation
 */

import {
  createForm,
  addField,
  addDependency,
  createTextField,
  createEmailField,
  createNumberField,
  createDateField,
  createFileField,
  createRadioField,
  createCheckboxField,
  createSelectField,
  createOptions,
  createDependency,
  createCondition,
  showEffect,
  requireEffect,
  hideEffect,
  toJSON,
} from '../src/index';

// Create the job application form
let jobForm = createForm('job-application', {
  title: 'Job Application',
  description: 'Apply for a position at our company',
});

// Personal Information
jobForm = addField(
  jobForm,
  createTextField('firstName', 'First Name', {
    minLength: 1,
    maxLength: 50,
  })
);

jobForm = addField(
  jobForm,
  createTextField('lastName', 'Last Name', {
    minLength: 1,
    maxLength: 50,
  })
);

jobForm = addField(
  jobForm,
  createEmailField('email', 'Email Address', {
    required: true,
  })
);

// Position Selection
jobForm = addField(
  jobForm,
  createRadioField('position', 'Position Applying For', {
    required: true,
    options: createOptions([
      { value: 'dev', label: 'Software Developer' },
      { value: 'designer', label: 'UI/UX Designer' },
      { value: 'pm', label: 'Project Manager' },
      { value: 'other', label: 'Other' },
    ]),
  })
);

// Other position field (conditionally shown)
jobForm = addField(
  jobForm,
  createTextField('positionOther', 'Please Specify Position', {
    minLength: 1,
    maxLength: 100,
  })
);

// Add dependency to show "other" position field
jobForm = addDependency(
  jobForm,
  createDependency(
    'position',
    createCondition('equals', 'other'),
    [
      showEffect('positionOther'),
      requireEffect('positionOther'),
    ],
    'show-other-position'
  )
);

// Experience
jobForm = addField(
  jobForm,
  createNumberField('experienceYears', 'Years of Experience', {
    required: true,
    min: 0,
    max: 50,
    decimals: 0,
  })
);

// Salary Expectations
jobForm = addField(
  jobForm,
  createNumberField('expectedSalary', 'Expected Salary (USD)', {
    min: 0,
    decimals: 2,
  }, {
    tooltip: 'Annual salary expectation',
  })
);

// Start Date
jobForm = addField(
  jobForm,
  createDateField('startDate', 'Available Start Date', {
    required: true,
    minDate: new Date().toISOString().split('T')[0],
  })
);

// Work Type Preference
jobForm = addField(
  jobForm,
  createSelectField('workType', 'Work Type Preference', {
    required: true,
    options: createOptions(['Remote', 'On-site', 'Hybrid']),
  })
);

// Resume Upload
jobForm = addField(
  jobForm,
  createFileField('resume', 'Resume/CV', {
    required: true,
    maxSize: 5242880, // 5MB
    acceptedTypes: ['.pdf', '.doc', '.docx'],
    acceptedMimeTypes: ['application/pdf', 'application/msword'],
  }, {
    tooltip: 'Accepted formats: PDF, DOC, DOCX (max 5MB)',
  })
);

// Cover Letter
jobForm = addField(
  jobForm,
  createTextField('coverLetter', 'Cover Letter', {
    minLength: 100,
    maxLength: 2000,
    multiline: true,
  }, {
    tooltip: 'Tell us why you\'re a great fit for this position',
  })
);

// Portfolio URL (optional)
jobForm = addField(
  jobForm,
  createTextField('portfolioUrl', 'Portfolio/GitHub URL', {
    minLength: 0,
    pattern: '^https?://.*',
  }, {
    tooltip: 'Link to your portfolio or GitHub profile',
  })
);

// References
jobForm = addField(
  jobForm,
  createCheckboxField('hasReferences', 'I can provide professional references', {})
);

// Export to JSON
const formJSON = toJSON(jobForm, true);

console.log('Job Application Form JSON:');
console.log(formJSON);

export default jobForm;
