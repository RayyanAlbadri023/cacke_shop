import * as yup from "yup";

export const UserLoginSchemaValidation = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .matches(/@gmail\.com$/, "Email must be a Gmail address")
    .required("Email is required"),

  password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
});