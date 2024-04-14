import Select from "react-select";

import PropTypes from "prop-types";

function AppSelect({
  errors,
  label,
  value,
  fieldName,
  options,
  isMulti = false,
  trackBy = "value", // react-select uses a 'value' key by default
  labelField = "label", // react-select uses a 'label' key by default
  //   customLabel,
  placeholder,
  isLoading = false,
  isDisabled = false,
  //   allowEmpty = true,
  //   deselectLabel = "",
  //   selectLabel = "",
  //   selectedLabel = "",
  onChange,
  //   onInputChange,
}) {
  //   const formatOptionLabel = (option) =>
  //     customLabel ? customLabel(options) : option[labelField];

  const handleChange = (selected) => {
    onChange(selected);
    // console.log("handle change", selected);
  };

  //   const handleInputChange = (newValue) => onInputChange(newValue);

  const customStyles = {
    indicatorSeparator: (base) => ({
      ...base,
      display: "none",
    }),
  };

  //   const customStyles = {
  // //     dropdownIndicator: (base, state) => ({
  // //       ...base,
  // //       transition: "all .2s ease",
  // //       transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : null,
  // //       // Apply additional styles as necessary
  // //       color: "darkgray", // Example color - change as needed
  // //     }),
  // //     // You might want to also adjust the padding, size or other aspects of the indicator
  // //     indicatorSeparator: () => ({
  // //       display: "none",
  // //     }),
  // //     // Add additional custom styles here if necessary
  // //   };

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
        // onInputChange={handleInputChange}
        value={value}
        placeholder={placeholder}
        isLoading={isLoading}
        isDisabled={isDisabled}
        classNamePrefix="react-select"
      />
      {errors && errors[fieldName] && (
        <div className="error">{errors[fieldName]}</div>
      )}
    </div>
  );
}

AppSelect.propTypes = {
  errors: PropTypes.object.isRequired,
  label: PropTypes.string,
  value: PropTypes.any,
  fieldName: PropTypes.string,
  options: PropTypes.array,
  isMulti: PropTypes.bool,
  trackBy: PropTypes.string,
  labelField: PropTypes.string,
  //   customLabel: PropTypes.func,
  placeholder: PropTypes.string,
  //   classProps: PropTypes.string,
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
