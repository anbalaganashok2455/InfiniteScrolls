import styles from "./ui.module.css";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  hasError?: boolean;
}

export default function Textarea({ hasError, className, ...props }: TextareaProps) {
  return (
    <textarea
      className={`${styles.textarea} ${hasError ? styles.inputError : ""} ${className ?? ""}`}
      {...props}
    />
  );
}
