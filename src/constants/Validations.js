import * as yup from 'yup';

export const registrationScheme = yup.object().shape({
  name: yup
    .string()
    .matches(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces')
    .required('Name is required'),
  phoneNumber: yup
    .string()
    .min(10, ({min}) => `Phone Number must be at least ${min} characters`)
    .required('Phone Number is required'),
});
export const loginSchema = yup.object().shape({
  phoneNumber: yup
    .string()
    .min(10, ({min}) => `Phone Number must be at least ${min} characters`)
    .required('Phone Number is required'),
});
