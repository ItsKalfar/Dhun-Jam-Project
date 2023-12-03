import { IoEye, IoEyeOff } from "react-icons/io5";
import { forwardRef, InputHTMLAttributes, FC, useState } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label?: string;
}

export const Input: FC<InputProps> = forwardRef<HTMLInputElement, InputProps>(
  ({ type, error, ...props }, ref) => {
    return (
      <div className="input-container">
        <input type={type} className="text-input-field" ref={ref} {...props} />
        <p className="error-message">{error}</p>
      </div>
    );
  }
);

export const NumberInput: FC<InputProps> = forwardRef<
  HTMLInputElement,
  InputProps
>(({ ...props }, ref) => {
  return (
    <div className="number-input-container">
      <input
        type={"number"}
        className="request-amount-input"
        ref={ref}
        {...props}
      />
    </div>
  );
});

export const PasswordInput: FC<InputProps> = forwardRef<
  HTMLInputElement,
  InputProps
>(({ error, ...props }, ref) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="input-container">
      <input
        type={showPassword ? "text" : "password"}
        className="text-input-field"
        ref={ref}
        {...props}
      />
      <p className="error-message">{error}</p>
      <button
        type="button"
        className="password-toggle"
        onClick={togglePasswordVisibility}
      >
        {showPassword ? (
          <IoEye size="25px" color="white" />
        ) : (
          <IoEyeOff size="25px" color="white" />
        )}
      </button>
    </div>
  );
});
