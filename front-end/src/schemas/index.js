import * as yup from 'yup';

const nameValidationRegex = /^[\p{L}\p{M} '-]+$/u;
const emailValidationRegex =
  /^[a-z0-9]([a-z0-9.+_-]?)+@[a-z0-9-]+(\.[a-z]{2,})+$/;

export const advancedSchema = yup.object().shape({
  fname: yup
    .string()
    .matches(nameValidationRegex, 'Invalid name. Please enter a valid name.')
    .min(3, 'Minimum characters should be 3')
    .required('Required'),
  lname: yup
    .string()
    .matches(nameValidationRegex, 'Invalid name. Please enter a valid name.')
    .min(3, 'Minimum characters should be 3')
    .required('Required'),
  email: yup
    .string()
    .matches(emailValidationRegex, 'Invalid email. Please enter a valid email.')
    .email('Enter valid email')
    .required('Required'),
  dob: yup.date().required('Required'),
  gender: yup
    .string()
    .oneOf(['male', 'female', 'other'], 'Please select a gender type')
    .required('Required'),
});
