import * as Yup from "yup";

const ValidationSchema = Yup.object({
  name: Yup.string()
    .matches(/^[A-Za-z]+$/, "Name must contain only alphabets")
    .required("Name is required"),

  lastname: Yup.string()
    .matches(/^[A-Za-z]*$/, "Lastname must contain only alphabets")
    .notRequired(),

  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),

  mobile: Yup.string()
    .matches(/^[0-9]{10}$/, "Mobile must be 10 digits")
    .required("Mobile is required"),

  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),

  address: Yup.string().required("Address is required"),

  pincode: Yup.string()
    .matches(/^[0-9]{6}$/, "Pincode must be 6 digits")
    .required("Pincode is required"),

  skills1: Yup.array()
    .defined()
    .min(1, "Select at least one skill"),
 

  gender: Yup.string().required("Gender is required"),

  agree: Yup.boolean().oneOf([true], "You must accept terms"),

  description: Yup.string().required("Description is required"),
  dob: Yup.string().required("Date of birth is required"),
});

export default ValidationSchema;
