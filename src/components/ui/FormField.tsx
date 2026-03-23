import styles from "./ui.module.css";

interface FormFieldProps {
  label: string;
  required?: boolean;
  error?: string;
  touched?: boolean;
  children: React.ReactNode;
}

export default function FormField({
  label,
  required,
  error,
  touched,
  children,
}: FormFieldProps) {
  return (
    <div className={styles.fieldGroup}>
      <label className={styles.label}>
        {label} {required && <span className={styles.required}>*</span>}
      </label>
      {children}
      {touched && error && <span className={styles.errorText}>{error}</span>}
    </div>
  );
}
