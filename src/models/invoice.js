import { Model, attr } from "redux-orm";
import { uuidv4 } from "../utils/helpers";

class Invoice extends Model {}
Invoice.modelName = "Invoice";
Invoice.fields = {
  id: attr({ getDefault: () => uuidv4() }),
  issuedAt: attr({ getDefault: () => "" }),
  dueAt: attr({ getDefault: () => "" }),
  invoiceNumber: attr({ getDefault: () => "" }),
  lateFee: attr({ getDefault: () => "" }),
  currency: attr({ getDefault: () => "" }),
  status: attr({ getDefault: () => "draft" }),
};

export default Invoice;
