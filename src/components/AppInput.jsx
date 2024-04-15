// import { useRef } from "react";

import PropTypes from "prop-types";
import AppError from "./AppError";

export default function AppInput({
  errors,
  label,
  value,
  field,
  type = "text",
  max,
  disabled,
  placeholder,
  size,
  labelClasses,
  inputClasses = [],
  containerClasses,
  autocomplete = "on",
  children,
  onChange,
  className,
  //   onSubmit,
}) {
  //   const inputRef = useRef();

  //   const focus = () => {
  //     inputRef.current.focus();
  //   };

  const handleInput = (e) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  //   const handleKeyDown = (e) => {
  //     if (e.key === "Enter" && onSubmit) {
  //       onSubmit(e.target.value);
  //     }
  //   };
  return (
    <div className={`form-group mb-3 ${className}`}>
      {label && (
        <label
          htmlFor={field}
          className={labelClasses}
          style={{ marginBottom: "0.5rem" }}
        >
          {label}
        </label>
      )}
      <div className={containerClasses}>
        <input
          disabled={disabled}
          type={type}
          id={field}
          placeholder={placeholder}
          className={`form-control ${errors && errors.has(field) ? "is-invalid" : ""} ${size ? "form-control-" + size : ""} ${inputClasses.join(" ")}`}
          autoComplete={autocomplete}
          maxLength={max}
          onChange={handleInput}
          //   onKeyDown={handleKeyDown}
          value={value}
        />
        {children}
      </div>
      {errors && <AppError errors={errors} field={field} />}
    </div>
  );
}

AppInput.propTypes = {
  errors: PropTypes.object, // Add this line
  label: PropTypes.string,
  value: PropTypes.any,
  field: PropTypes.string,
  type: PropTypes.string,
  max: PropTypes.number,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  size: PropTypes.string,
  labelClasses: PropTypes.string,
  className: PropTypes.string,
  inputClasses: PropTypes.array,
  containerClasses: PropTypes.string,
  autocomplete: PropTypes.string,
  children: PropTypes.node,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
};
