"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { addUser, updateUser, type UserForm } from "@/redux/slice";
import validationSchema from "@/components/userValidation";
import styles from "./UserInfo.module.css";

// ── Reusable UI components ────────────────────────────────────
import FormField from "./ui/FormField";
import TextInput from "./ui/TextInput";
import Textarea from "./ui/Textarea";
import DateInput from "./ui/DateInput";
import RadioGroup from "./ui/RadioGroup";
import Toggle from "./ui/Toggle";
import Checkbox from "./ui/Checkbox";
import Button from "./ui/Button";
import MultiSelectSearch from "./ui/MultiSelectSearch";
import MultiSelect from "./ui/MultiSelect";
import Select from "./ui/Select";
import DateRangePicker from "./ui/DatePicker";

type FormValues = Omit<UserForm, "id">;

const initialEmpty: FormValues = {
  name: "",
  lastname: "",
  email: "",
  mobile: "",
  password: "",
  confirmPassword: "",
  address: "",
  pincode: "",
  skills1: [],
  skills2: [],
  skills3: '',
  gender: "female",
  receiveNotifications: false,
  agree: false,
  description: "",
  dob: null,
  dobPicker: { startDate: new Date(), endDate: new Date() },
};

const GENDER_OPTIONS = [
  { label: "Female", value: "female" },
  { label: "Male", value: "male" },
  { label: "Other", value: "other" },
];

interface Props {
  id?: string;
}

export default function UserInfo({ id }: Props) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const users = useAppSelector((state) => state.users.users);

  const existingUser = id ? users.find((u) => u.id === Number(id)) : undefined;
  const isEdit = Boolean(id);

  const [values, setValues] = useState<FormValues>(
    existingUser ? { ...existingUser } : { ...initialEmpty }
  );
  const [errors, setErrors] = useState<Partial<Record<keyof FormValues, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormValues, boolean>>>({});

  const [range, setRange] = useState({startDate: new Date(), endDate: new Date(),});


  useEffect(() => {
    if (existingUser) setValues({ ...existingUser });
  }, [existingUser]);

  const reset = () => {
    setValues({ ...initialEmpty });
    setErrors({});
    setTouched({});
  };
const handleMultiChange = async (name: string, value: string[]) => {
  setValues((prev) => ({ ...prev, [name]: value }));

  try {
    await validationSchema.validateAt(name, value);
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  } catch (err: unknown) {
    if (err instanceof Error) {
      setErrors((prev) => ({ ...prev, [name]: err.message }));
    }
  }
};
  const handleChange = async(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setValues((prev) => ({ ...prev, [name]: checked }));
    } else if (e.target instanceof HTMLSelectElement && e.target.multiple) {
      const selected = Array.from(e.target.selectedOptions).map((o) => o.value);
      setValues((prev) => ({ ...prev, [name]: selected }));
    } else {
      setValues((prev) => ({ ...prev, [name]: e.target.value }));
    }
      try {
    await validationSchema.validateAt(name, e.target.value );
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  } catch (err: unknown) {
    if (err instanceof Error) {
      setErrors((prev) => ({ ...prev, [name]: err.message }));
    }}
  };

  const handleBlur = async (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    console.log("Validating field:", name, values[name as keyof FormValues]);
    try {
      await validationSchema.validateAt(name, values);
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrors((prev) => ({ ...prev, [name]: err.message }));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await validationSchema.validate(values, { abortEarly: false });
      if (isEdit) {
        dispatch(updateUser({ ...values, id: Number(id) }));
      } else {
        dispatch(addUser({ ...values, id: Date.now() }));
      }
      router.push("/userdata");
    } catch (err: unknown) {
      const newErrors: Partial<Record<keyof FormValues, string>> = {};
      const newTouched: Partial<Record<keyof FormValues, boolean>> = {};
      if (
        err &&
        typeof err === "object" &&
        "inner" in err &&
        Array.isArray((err as { inner: unknown[] }).inner)
      ) {
        (err as { inner: { path: string; message: string }[] }).inner.forEach((e) => {
          newErrors[e.path as keyof FormValues] = e.message;
          newTouched[e.path as keyof FormValues] = true;
        });
      }
      setErrors(newErrors);
      setTouched(newTouched);
    }
  };

  const hasError = (field: keyof FormValues) =>
    Boolean(touched[field] && errors[field]);

  const fieldProps = (field: keyof FormValues) => ({
    error: errors[field],
    touched: Boolean(touched[field]),
  });

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                  <h2 className={styles.title} style={{width:'50%',alignItems:'center'}}>User Form</h2>
        <Button variant="outline" style={{width:'100%'}} onClick={() => router.push("/cards")}>infinite scroll</Button>
        </div>


        <form onSubmit={handleSubmit} noValidate>

          <div className={styles.row}>
            <FormField label="Name" required {...fieldProps("name")}>
              <TextInput name="name" value={values.name} onChange={handleChange} onBlur={handleBlur} placeholder="First name" hasError={hasError("name")} />
            </FormField>
            <FormField label="Last Name" {...fieldProps("lastname")}>
              <TextInput name="lastname" value={values.lastname} onChange={handleChange} onBlur={handleBlur} placeholder="Last name" hasError={hasError("lastname")} />
            </FormField>
          </div>

          <div className={styles.row}>
            <FormField label="Email" required {...fieldProps("email")}>
              <TextInput type="email" name="email" value={values.email} onChange={handleChange} onBlur={handleBlur} placeholder="you@example.com" hasError={hasError("email")} />
            </FormField>
            <FormField label="Mobile" required {...fieldProps("mobile")}>
              <TextInput name="mobile" value={values.mobile} onChange={handleChange} onBlur={handleBlur} placeholder="10-digit number" hasError={hasError("mobile")} />
            </FormField>
          </div>

          <div className={styles.row}>
            <FormField label="Password" required {...fieldProps("password")}>
              <TextInput type="password" name="password" value={values.password} onChange={handleChange} onBlur={handleBlur} placeholder="Min 6 characters" hasError={hasError("password")} />
            </FormField>
            <FormField label="Confirm Password" required {...fieldProps("confirmPassword")}>
              <TextInput type="password" name="confirmPassword" value={values.confirmPassword} onChange={handleChange} onBlur={handleBlur} placeholder="Repeat password" hasError={hasError("confirmPassword")} />
            </FormField>
          </div>

          <FormField label="Address" required {...fieldProps("address")}>
            <Textarea name="address" value={values.address} onChange={handleChange} onBlur={handleBlur} rows={2} placeholder="Street, city…" hasError={hasError("address")} />
          </FormField>

          <div className={styles.row}>
            <FormField label="Date of Birth" {...fieldProps("dob")}>
              <DateInput name="dob" value={values.dob ?? ""} onChange={handleChange} onBlur={handleBlur} />
            </FormField>
            <FormField label="Pincode" required {...fieldProps("pincode")}>
              <TextInput name="pincode" value={values.pincode} onChange={handleChange} onBlur={handleBlur} placeholder="6-digit pincode" hasError={hasError("pincode")} />
            </FormField>
          </div>
          <FormField label="Date Range" required>
            <DateRangePicker value={values.dobPicker}             
            onChange={(val) => setValues((prev) => ({ ...prev, dobPicker: val }))} />
          </FormField>
          <FormField label="Skills multiselectSearch" required {...fieldProps("skills1")}>
            <MultiSelectSearch
              options={["React", "Node", "Angular", "Vue"]}
              value={values.skills1}
           onChange={(val) => handleMultiChange("skills1", val)}
              onBlur={handleBlur}
              placeholder="Select skills multiselectSearch"
            />
          </FormField>
            <FormField label="Skills multiselect" required {...fieldProps("skills2")}>
            <MultiSelect
              options={["React", "Node", "Angular", "Vue"]}
              value={values.skills2}
                 onChange={(val) => setValues((prev) => ({ ...prev, skills2: val }))}
              placeholder="Select skills multiselect"
            />
          </FormField>
                    <FormField label="Skills Select" required {...fieldProps("skills3")}>
            <Select
              options={["React", "Node", "Angular", "Vue"]}
              value={values.skills3}
              onChange={(val:any) => setValues((prev) => ({ ...prev, skills3: val }))}
              placeholder="Select skills Select"
            />
          </FormField>

          <FormField label="Gender" required {...fieldProps("gender")}>
            <RadioGroup name="gender" options={GENDER_OPTIONS} value={values.gender} onChange={handleChange} />
          </FormField>

          <Toggle name="receiveNotifications" checked={values.receiveNotifications} label="Receive Notifications" onChange={handleChange} />

          <FormField label="" {...fieldProps("agree")}>
            <Checkbox id="agree" name="agree" checked={values.agree} label="I agree to Terms & Conditions" onChange={handleChange} onBlur={handleBlur} />
          </FormField>

          <FormField label="Description" required {...fieldProps("description")}>
            <Textarea name="description" value={values.description} onChange={handleChange} onBlur={handleBlur} rows={4} placeholder="Tell us about yourself…" hasError={hasError("description")} />
          </FormField>

          <div className={styles.controlsRow}>
            <Button type="submit" variant="outline">{isEdit ? "Update" : "Submit"}</Button>
            {!isEdit && <Button type="reset" variant="outline" onClick={reset}>Reset</Button>}
            <Button type="button" variant="filled" onClick={() => router.push("/userdata")}>View Table</Button>
          </div>

        </form>

      </div>
    </div>
  );
}
