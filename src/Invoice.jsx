import { useParams } from "react-router-dom";
import { useInvoiceById } from "./hooks";
import InvoiceControls from "./InvoiceControls";
import InvoiceForm from "./InvoiceForm";

function Invoice() {
  const { id } = useParams();
  const invoice = useInvoiceById(id);

  return (
    <div>
      <InvoiceControls className="d-print-none" invoice={invoice} />
      <InvoiceForm invoice={invoice} />
    </div>
  );
}

export default Invoice;
