import styles from "./ui.module.css";

interface RadioGroupProps {
  name: string;
  options: { label: string; value: string }[];
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

export default function RadioGroup({ name, options, value, onChange }: RadioGroupProps) {
  return (
    <div className={styles.radioGroup}>
      {options.map((opt) => (
        <label key={opt.value} className={styles.radioLabel}>
          <input
            type="radio"
            name={name}
            value={opt.value}
            checked={value === opt.value}
            onChange={onChange}
          />
          {opt.label}
        </label>
      ))}
    </div>
  );
}
