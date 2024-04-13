import { Link } from "react-router-dom";

import PropTypes from "prop-types";

function InvoiceControls({ invoice }) {
  if (!invoice) return null;
  return (
    <div className="row">
      <div className="col-12 mb-4 d-flex justify-content-between align-items-start">
        <Link to="/invoices" className="btn btn-sm btn-light btn--icon-left">
          <i className="material-icons">arrow_back</i>
          <div className="d-inline-block">Back</div>
        </Link>
        <div className="d-flex align-items-center"></div>
      </div>
    </div>
  );
}

InvoiceControls.propTypes = {
  invoice: PropTypes.object.isRequired,
};

export default InvoiceControls;
