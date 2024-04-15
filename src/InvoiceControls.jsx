import { Link } from "react-router-dom";

import PropTypes from "prop-types";
import AppSelect from "./AppSelect";
import { useMemo, useState } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { useUpdateInvoice } from "./hooks";

function InvoiceControls({ invoice }) {
  //   const updateProp = (props) => {
  //     console.log("Updating Propse", props);
  //   };
  const [isCompact, setIsCompact] = useState(false);

  const toggleCompact = () => {
    setIsCompact(!isCompact);
  };

  const openCustomizationsModal = () => {
    // Open customizations modal
  };

  const print = () => {
    // Print invoice
  };

  const deleteInvoice = () => {
    // Delete invoice
  };

  const bookInvoice = () => {
    console.log("Book Invoice");
  };
  const invoiceStatuses = useMemo(
    () => [
      {
        value: "draft",
        name: "Draft",
      },
      {
        value: "booked",
        name: "Booked",
      },
      {
        value: "sent",
        name: "Sent",
      },
      {
        value: "paid",
        name: "Paid",
      },
      {
        value: "cancelled",
        name: "Cancelled",
      },
    ],
    [],
  );

  const getStatusObj = useMemo(
    () => invoiceStatuses.find((obj) => obj.value === invoice.status),
    [invoice.status, invoiceStatuses],
  );
  const updateInvoice = useUpdateInvoice();

  if (!invoice) return null;
  return (
    <div className="row d-print-none">
      <div className="col-12 mb-4 d-flex justify-content-between align-items-start">
        <Link to="/invoices" className="btn btn-sm btn-light btn--icon-left">
          <i className="material-icons">arrow_back</i>
          <div className="d-inline-block">Back</div>
        </Link>
        <div className="d-flex align-items-center">
          <AppSelect
            value={getStatusObj}
            options={invoiceStatuses}
            labelField="name"
            // onInputChange={(e) => console.log("input change", e)}
            onChange={(e) => updateInvoice(invoice.id, { status: e.value })}
            placeholder={"Select option"}
          />
          {invoice.status === "draft" && (
            <button
              className="btn btn-outline-dark"
              onClick={() => bookInvoice}
            >
              Book
            </button>
          )}
          <DropdownButton
            id="dropdown-basic-button"
            title={<i className="material-icons">more_vert</i>}
            variant="link"
          >
            <Dropdown.Header>Design and Layout</Dropdown.Header>
            <Dropdown.Item onClick={toggleCompact}>
              {isCompact ? "Comfortable" : "Compact"}
            </Dropdown.Item>
            <Dropdown.Item onClick={openCustomizationsModal}>
              Customize
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={print}>Download PDF</Dropdown.Item>
            <Dropdown.Item onClick={deleteInvoice}>Delete</Dropdown.Item>
          </DropdownButton>
        </div>
      </div>
    </div>
  );
}

InvoiceControls.propTypes = {
  invoice: PropTypes.object.isRequired,
};

export default InvoiceControls;
