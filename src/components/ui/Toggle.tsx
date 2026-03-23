import styles from "./ui.module.css";

interface ToggleProps {
  name: string;
  checked: boolean;
  label: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

export default function Toggle({ name, checked, label, onChange }: ToggleProps) {
  return (
    <div className={styles.switchRow}>
      <label className={styles.switch}>
        <input
          type="checkbox"
          name={name}
          checked={checked}
          onChange={onChange}
        />
        <span className={styles.slider} />
      </label>
      <span className={styles.switchLabel}>{label}</span>
    </div>
  );
}
