import PropTypes from "prop-types";
import TeamLogo from "./components/TeamLogo";
import { useErrors } from "./hooks";

function InvoiceForm({ invoice }) {
  const errors = useErrors();
  return (
    <div className="row">
      <div className="col-12 scrollbar invoice-container">
        {invoice && (
          <div className="card bg-base dp--02 invoice-box">
            <div className="card-body">
              <div className="row mb-5">
                <TeamLogo className="col-4" errors={errors} />
              </div>
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
