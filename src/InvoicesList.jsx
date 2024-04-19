import EmptyState from "./EmptyState";

import PropTypes from "prop-types";
import { formatDate } from "./utils/dateFormatter";
import { capitalize, formatCurrency } from "./utils/helpers";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

function InvoicesList({ invoices }) {
  const navigate = useNavigate();
  const openInvoice = (id) => {
    navigate(`/invoice/${id}`);
  };

  const isOverDue = (invoice) => {
    return invoice.status === "sent" && invoice.dueAr < dayjs().format();
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
                <td>
                  {/* TODO: Fix after adding subTotal getter to model, should be formatCurrency(total.subTotal) */}
                  {formatCurrency(500)}
                  {/* TODO: Fix after adding is taxTotal getter to model, should invoice.taxTotal && ... */}
                  {!invoice && (
                    <small>
                      <br />
                      {/* TODO: Fix after adding total getter to model, should be formatCurrency(total.total) */}
                      {formatCurrency(500)}
                    </small>
                  )}
                </td>
                <td className="text-end">
                  {isOverDue(invoice) ? (
                    <i className="material-icons material-icons-round md-18 me-2 text-warning">
                      warning
                    </i>
                  ) : invoice.status === "paid" ? (
                    <i className="material-icons material-icons-round md-18 me-2 text-success">
                      done
                    </i>
                  ) : null}
                  {capitalize(invoice.status)}
                </td>
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
