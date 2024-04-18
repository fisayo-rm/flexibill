import { useState } from "react";
import DatePicker from "react-datepicker";
import AppError from "./AppError";
import dayjs from "dayjs";
import PropTypes from "prop-types";

import "react-datepicker/dist/react-datepicker.css";

export default function AppDatePicker({
  errors,
  label,
  value,
  field,
  disabled,
  inline = false,
  format = "YYYY-MM-DD",
  modelFormat = "YYYY-MM-DD",
  placeholder,
  labelClasses,
  inputClasses = [],
  containerClasses,
  onChange,
  children,
}) {
  const [selectedDate, setSelectedDate] = useState(
    Array.isArray(value)
      ? value.map((val) => dayjs(val, modelFormat).toDate())
      : dayjs(value, modelFormat).toDate(),
  );

  const handleChange = (date) => {
    setSelectedDate(date);
    const outputValue = Array.isArray(date)
      ? date.map((val) => toModelFormat(val))
      : toModelFormat(date);
    if (onChange && typeof onChange === "function") {
      onChange(outputValue);
    }
  };

  const toModelFormat = (val) => {
    return val ? dayjs(val).format(modelFormat) : null;
  };

  return (
    <div>
      {label && (
        <label htmlFor={field} className={labelClasses}>
          {label}
        </label>
      )}
      <div className={containerClasses}>
        <DatePicker
          disabled={disabled}
          inline={inline}
          id={field}
          className={`form-control ${errors && errors.has(field) ? "is-invalid" : ""} ${inputClasses.join(" ")}`}
          placeholderText={placeholder}
          autoComplete="off"
          onChange={handleChange}
          selected={selectedDate}
          dateFormat={format}
        />
        {children}
        {errors && <AppError errors={errors} field={field} />}
      </div>
    </div>
  );
}

AppDatePicker.propTypes = {
  errors: PropTypes.object,
  label: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  field: PropTypes.string,
  disabled: PropTypes.bool,
  inline: PropTypes.bool,
  format: PropTypes.string,
  modelFormat: PropTypes.string,
  placeholder: PropTypes.string,
  labelClasses: PropTypes.string,
  inputClasses: PropTypes.array,
  containerClasses: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  children: PropTypes.node,
};
