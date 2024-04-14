import React from "react";

import PropTypes from "prop-types";

export default function AppError({ errors, field }) {
  if (!errors.has(field)) {
    return null;
  }
  return (
    <div className="invalid-feedback">
      {errors.get(field).map((error, index) => (
        <React.Fragment key={index}>
          {error} <br />
        </React.Fragment>
      ))}
    </div>
  );
}

AppError.propTypes = {
  errors: PropTypes.object.isRequired,
  field: PropTypes.string.isRequired,
};
