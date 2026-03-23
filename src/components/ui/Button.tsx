import styles from "./ui.module.css";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "outline" | "filled";
}

export default function Button({
  variant = "filled",
  children,
  className,
  ...props
}: ButtonProps) {
  const cls =
    variant === "outline" ? styles.btnOutline : styles.btnFilled;
  return (
    <button className={`${cls} ${className ?? ""}`} {...props}>
      {children}
    </button>
  );
}
