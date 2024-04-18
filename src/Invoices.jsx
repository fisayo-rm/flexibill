import { useCallback, useMemo } from "react";
import { ButtonGroup, Dropdown, DropdownButton } from "react-bootstrap";
import InvoicesList from "./InvoicesList";
import { useAddInvoices, useInvoices } from "./hooks";
import { useNavigate } from "react-router-dom";

function Invoices() {
  const navigate = useNavigate();
  const addInvoice = useAddInvoices();
  const invoices = useInvoices();
  const isStorageLocal = useMemo(() => {
    return true;
  }, []);

  const createNewInvoice = useCallback(() => {
    const newInvoice = addInvoice();
    navigate(`/invoice/${newInvoice.id}`);
  }, [addInvoice, navigate]);

  return (
    <div>
      <div className="row">
        <div className="col-12 mb-4 pr-0 d-flex justify-content-between">
          <h4 className="mb-0">Invoices</h4>
          <div>
            <button
              onClick={() => createNewInvoice()}
              className={`btn btn-sm btn-outline-dark ${isStorageLocal ? "" : "mr-3"}`}
            >
              New Invoice
            </button>
            {isStorageLocal && (
              <DropdownButton
                as={ButtonGroup}
                variant="link"
                size="sm"
                title={<i className="material-icons">more_vert</i>}
              >
                <Dropdown.Item onClick={() => console.log("Export")}>
                  Export
                </Dropdown.Item>
                <Dropdown.Item onClick={() => console.log("Import")}>
                  Import
                </Dropdown.Item>
              </DropdownButton>
            )}
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <InvoicesList invoices={invoices} />
        </div>
      </div>
    </div>
  );
}

export default Invoices;
