import React, {
  forwardRef,
  InputHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";

interface BaseProps {
  label: string;
  variant?: "input" | "textarea";
  error?: string;
  customPadding?: string;
}

export type InputProps = BaseProps &
  Omit<InputHTMLAttributes<HTMLInputElement>, "variant"> &
  Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "variant">;

const Input = forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps>(
  (
    {
      label,
      variant = "input",
      className = "",
      error,
      customPadding,
      ...props
    },
    ref,
  ) => {
    const fieldPadding =
      customPadding || (variant === "textarea" ? "p-4" : "px-4 py-3");

    const inputClasses = `w-full rounded-xl bg-background text-foreground placeholder:text-muted-foreground/60 border outline-none transition-all duration-200 mt-1.5 text-sm font-medium ${
      error
        ? "border-destructive focus:border-destructive focus:ring-2 focus:ring-destructive/10"
        : "border-border bg-surface/20 focus:bg-background focus:border-accent focus:ring-2 focus:ring-accent/10"
    } ${fieldPadding} ${className}`;

    return (
      <div className="flex flex-col w-full group">
        <label className="text-xs font-bold tracking-wider text-muted-foreground uppercase transition-colors group-focus-within:text-accent">
          {label}
        </label>

        {variant === "textarea" ? (
          <textarea
            ref={ref as React.Ref<HTMLTextAreaElement>}
            rows={4}
            className={`resize-none ${inputClasses}`}
            {...(props as TextareaHTMLAttributes<HTMLTextAreaElement>)}
          />
        ) : (
          <input
            ref={ref as React.Ref<HTMLInputElement>}
            className={inputClasses}
            {...(props as InputHTMLAttributes<HTMLInputElement>)}
          />
        )}

        {error && (
          <p className="mt-1.5 text-xs font-semibold tracking-wide text-destructive animate-fade-in">
            {error}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
