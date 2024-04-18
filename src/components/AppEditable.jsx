import { useEffect, useRef, useState } from "react";
import AppError from "./AppError";
import PropTypes from "prop-types";

export default function AppEditable({
  value = "",
  placeholder = "Enter item",
  disabled = false,
  suffix,
  errors,
  field,
  onChange,
  invoice,
}) {
  const [focusInVal, setFocusInVal] = useState(null);
  const [tmpVal, setTmpVal] = useState(null);
  const editableRef = useRef();
  const [isFocused, setIsFocused] = useState(false);

  const onInput = (e) => {
    setTmpVal(e.target.innerText);
  };

  const onFocusIn = () => {
    setIsFocused(true);
    setFocusInVal(editableRef.current.innerText);
  };

  const onFocusOut = () => {
    setIsFocused(false);
    if (focusInVal !== editableRef.current.innerText) {
      onChange(editableRef.current.innerText);
    }
  };

  const focus = () => {
    editableRef.current.focus();
  };

  useEffect(() => {
    editableRef.current.innerText = value;
    setTmpVal(value);
  }, [value, invoice]);
  return (
    <span
      className={`editable ${!tmpVal ? "text-muted d-print-none" : ""} ${errors && errors.has(field) ? "is-invalid" : ""}`}
      onClick={focus}
      onKeyDown={(event) => {
        if (event.key === "Enter") {
          event.preventDefault();
          onFocusOut();
        }
      }}
      role="textbox"
      tabIndex={0}
    >
      <span
        ref={editableRef}
        className={`editable__item ${!tmpVal || (!tmpVal && !isFocused) ? "position-absolute" : ""}`}
        contentEditable={!disabled}
        onInput={onInput}
        onFocus={onFocusIn}
        onBlur={onFocusOut}
      ></span>
      {!tmpVal && <span className="editable__item">{placeholder}</span>}
      {suffix && <span>{suffix}</span>}
      {errors && <AppError errors={errors} field={field} />}
    </span>
  );
}

AppEditable.propTypes = {
  invoice: PropTypes.object.isRequired,
  errors: PropTypes.object,
  suffix: PropTypes.any,
  value: PropTypes.any,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  field: PropTypes.string,
};
