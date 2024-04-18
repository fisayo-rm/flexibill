import EmptyState from "./EmptyState";

import PropTypes from "prop-types";
import { formatDate } from "./utils/dateFormatter";
import { formatCurrency } from "./utils/helpers";
import { useNavigate } from "react-router-dom";

function InvoicesList({ invoices }) {
  const navigate = useNavigate();
  const openInvoice = (id) => {
    navigate(`/invoice/${id}`);
  };
  return (
    <div className="table-responsive">
      {!invoices ? (
        <div className="col-12">Loading</div>
      ) : invoices && invoices.length ? (
        <table className="table table--card table-hover">
          <thead>
            <tr>
              <th>{" Invoice Number "}</th>
              <th>{" Client "}</th>
              <th>{" Issued At "}</th>
              <th>{" Total "}</th>
              <th className="text-end">{" Status "}</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice) => (
              <tr
                key={invoice.id}
                className="pointer"
                onClick={() => openInvoice(invoice.id)}
              >
                <td>{invoice.invoiceNumber}</td>
                <td>{invoice.client ? invoice.client.companyName : ""}</td>
                <td>
                  {formatDate(invoice.issuedAt, "D MMM YYYY", "YYYY-MM-DD")}
                </td>
                <td>{formatCurrency(invoice.subTotal)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <EmptyState content="Nothing here yet" />
      )}
    </div>
  );
}

InvoicesList.propTypes = {
  invoices: PropTypes.array.isRequired,
};

export default InvoicesList;
