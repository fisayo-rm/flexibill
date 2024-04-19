import Select from "react-select";

import PropTypes from "prop-types";
import AppError from "./components/AppError";

function AppSelect({
  errors,
  label,
  value,
  fieldName,
  options,
  isMulti = false,
  trackBy = "value", // react-select uses a 'value' key by default
  labelField = "label", // react-select uses a 'label' key by default
  placeholder,
  isLoading = false,
  isDisabled = false,
  onChange,
}) {
  const handleChange = (selected) => {
    onChange(selected);
  };

  const customStyles = {
    indicatorSeparator: (base) => ({
      ...base,
      display: "none",
    }),
    menu: (base) => ({
      ...base,
      zIndex: 9999,
    }),
  };

  return (
    <div
      className={`form-group mb-0 me-2 text-capitalize multiselect--capitalize  ${errors && errors[fieldName] ? "is-invalid" : ""}`}
    >
      {label && <label htmlFor={fieldName}>{label}</label>}
      <Select
        styles={customStyles}
        id={fieldName}
        options={options}
        isMulti={isMulti}
        getOptionLabel={(option) => option[labelField]}
        getOptionValue={(option) => option[trackBy]}
        onChange={handleChange}
        value={value}
        placeholder={placeholder}
        isLoading={isLoading}
        isDisabled={isDisabled}
        classNamePrefix="react-select"
      />

      {errors && <AppError errors={errors} field={fieldName} />}
    </div>
  );
}

AppSelect.propTypes = {
  errors: PropTypes.object,
  label: PropTypes.string,
  value: PropTypes.any,
  fieldName: PropTypes.string,
  options: PropTypes.array,
  isMulti: PropTypes.bool,
  trackBy: PropTypes.string,
  labelField: PropTypes.string,
  placeholder: PropTypes.string,
  isLoading: PropTypes.bool,
  isDisabled: PropTypes.bool,
  allowEmpty: PropTypes.bool,
  deselectLabel: PropTypes.string,
  selectLabel: PropTypes.string,
  selectedLabel: PropTypes.string,
  onChange: PropTypes.func,
  onInputChange: PropTypes.func,
};

export default AppSelect;
