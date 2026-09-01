import { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "hover";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: ReactNode;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
}

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-primary-foreground hover:bg-primary-hover shadow-lg shadow-primary/5",
  hover: "bg-surface text-foreground hover:bg-surface border border-border",
};

export default function Button({
  variant = "primary",
  children,
  leftIcon,
  rightIcon,
  fullWidth = false,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-flex h-12 items-center justify-center gap-2 rounded-xl px-6 text-sm font-semibold tracking-wide transition-all duration-200 ease-out disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer hover:scale-[1.01] active:scale-[0.99] ${
        fullWidth ? "w-full" : "w-fit"
      } ${variants[variant]} ${className}`}
      {...props}
    >
      {leftIcon && (
        <span className="flex items-center shrink-0">{leftIcon}</span>
      )}

      <span>{children}</span>

      {rightIcon && (
        <span className="flex items-center shrink-0">{rightIcon}</span>
      )}
    </button>
  );
}
