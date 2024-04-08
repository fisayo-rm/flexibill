import { useMemo } from "react";
import { ButtonGroup, Dropdown, DropdownButton } from "react-bootstrap";
import InvoicesList from "./InvoicesList";

function Invoices() {
  const isStorageLocal = useMemo(() => {
    return true;
  }, []);
  return (
    <div>
      <div className="row">
        <div className="col-12 mb-4 pr-0 d-flex justify-content-between">
          <h4 className="mb-0">Invoices</h4>
          <div>
            <button
              onClick={() => console.log("Create new invoice")}
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
          <InvoicesList />
        </div>
      </div>
    </div>
  );
}

export default Invoices;
