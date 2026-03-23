import styles from "./ui.module.css";

interface CheckboxProps {
  id: string;
  name: string;
  checked: boolean;
  label: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
}

export default function Checkbox({
  id,
  name,
  checked,
  label,
  onChange,
  onBlur,
}: CheckboxProps) {
  return (
    <div className={styles.checkRow}>
      <input
        type="checkbox"
        id={id}
        name={name}
        checked={checked}
        onChange={onChange}
        onBlur={onBlur}
      />
      <label htmlFor={id} className={styles.checkLabel}>
        {label}
      </label>
    </div>
  );
}
