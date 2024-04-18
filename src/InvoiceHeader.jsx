import AppDatePicker from "./components/AppDatePicker";
import AppEditable from "./components/AppEditable";
import PropTypes from "prop-types";
import { Modal } from "react-bootstrap";
import { formatCurrency } from "./utils/helpers";
import { formatDate } from "./utils/dateFormatter";
import { useState } from "react";

export default function InvoiceHeader({
  invoice,
  errors,
  updateInvoice,
  className,
}) {
  const [showIsDueAtModal, setShowIsDueAtModal] = useState(false);
  const [showIssuedAtModal, setShowIssuedAtModal] = useState(false);
  return (
    <div className={className}>
      <h3>
        {" Invoice "}
        <AppEditable
          value={invoice.invoiceNumber}
          errors={errors}
          field="invoiceNumber"
          placeholder="No."
          onChange={(value) => updateInvoice({ invoiceNumber: value })}
          invoice={invoice}
        />
      </h3>
      {" Issued at: "}
      <span
        className="editable__item"
        onClick={() => {
          setShowIssuedAtModal(true);
        }}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            setShowIssuedAtModal(true);
          }
        }}
        role="button"
        tabIndex={0}
      >
        {formatDate(invoice.issuedAt, "D. MMM YYYY", "YYYY-MM-DD")}
      </span>
      <Modal
        show={showIssuedAtModal}
        onHide={() => setShowIssuedAtModal(false)}
        id="modal_issued_at"
        centered
        size="sm"
        contentClassName="bg-base dp--24"
      >
        <Modal.Header closeButton style={{ fontSize: "0.65rem" }}>
          <Modal.Title style={{ fontSize: "1.25rem" }}>Issued at</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AppDatePicker
            value={invoice.issuedAt}
            onChange={(date) => updateInvoice({ issuedAt: date })}
            errors={errors}
            inline={true}
            field="issuedAt"
          />
        </Modal.Body>
      </Modal>
      <br />
      {" Due at: "}
      <span
        className="editable__item"
        onClick={() => {
          setShowIsDueAtModal(true);
        }}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            setShowIsDueAtModal(true);
          }
        }}
        role="button"
        tabIndex={0}
      >
        {formatDate(invoice.dueAt, "D. MMM YYYY", "YYYY-MM-DD")}
      </span>
      <Modal
        show={showIsDueAtModal}
        onHide={() => setShowIsDueAtModal(false)}
        id="modal_due_at"
        centered
        title="Due at"
        size="sm"
        contentClassName="bg-base dp--24"
      >
        <Modal.Header closeButton style={{ fontSize: "0.65rem" }}>
          <Modal.Title style={{ fontSize: "1.25rem" }}>Due at</Modal.Title>
        </Modal.Header>
        <Modal.Body></Modal.Body>
      </Modal>
      <br /> {" Late fee: "}
      <AppEditable
        value={formatCurrency(invoice.lateFee)}
        errors={errors}
        suffix="%"
        field="lateFee"
        placeholder="Add late fee"
        onChange={(value) => updateInvoice({ lateFee: value })}
        invoice={invoice}
      />
    </div>
  );
}

InvoiceHeader.propTypes = {
  invoice: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  updateInvoice: PropTypes.func.isRequired,
  className: PropTypes.string,
};
