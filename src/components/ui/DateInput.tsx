import styles from "./ui.module.css";

interface DateInputProps {
  name: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
}

export default function DateInput({ name, value, onChange, onBlur }: DateInputProps) {
  return (
    <input
      className={styles.input}
      type="date"
      name={name}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
    />
  );
}
