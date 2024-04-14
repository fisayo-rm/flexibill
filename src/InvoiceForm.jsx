import PropTypes from "prop-types";

function InvoiceForm({ invoice }) {
  return (
    <div className="row">
      <div className="col-12 scrollbar invoice-container">
        {invoice && (
          <div className="card bg-base dp--02 invoice-box">
            <div className="card-body">
              <div className="row mb-5"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

InvoiceForm.propTypes = {
  invoice: PropTypes.object.isRequired,
};

export default InvoiceForm;
