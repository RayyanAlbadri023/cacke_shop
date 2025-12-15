import * as yup from "yup";

// Signup validation
export const UserRegisterSchemaValidation = yup.object().shape({
  name: yup
    .string()
    .matches(/^[A-Za-z]+$/, "Name must contain only letters")
    .max(10, "Name must not exceed 10 characters")
    .required("Name is required"),

  email: yup
    .string()
    .email("Invalid email format")
    .matches(/@gmail\.com$/, "Email must be a Gmail address")
    .required("Email is required"),

  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),

  phone: yup
    .string()
    .matches(/^[79]\d{7}$/, "Phone number must be 8 digits and start with 7 or 9")
    .required("Phone number is required"),
});