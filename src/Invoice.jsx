import { useParams } from "react-router-dom";
import { useInvoiceById } from "./hooks";
import InvoiceControls from "./InvoiceControls";

function Invoice() {
  const { id } = useParams();
  const invoice = useInvoiceById(id);

  return <InvoiceControls className="d-print-none" invoice={invoice} />;
}

export default Invoice;
