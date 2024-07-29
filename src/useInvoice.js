import { useEffect } from "react";
import { Model, useDispatch, useStoreState } from "react-context-orm";

class Invoice extends Model {
  static entity = "invoices";

  static fields() {
    return {
      id: this.attr(null),
      status: this.attr("draft"),
    };
  }
}

export default function useInvoice() {
  const state = useStoreState();
  const dispatch = useDispatch();

  useEffect(() => {
    if (Invoice.store) return;
    Invoice.init(state, dispatch);
  }, [state, dispatch]);

  const createInvoice = async () => {
    const item = await Invoice.insert({ data: { id: Date.now() } });
    return item;
  };

  const deleteInvoice = () => {
    Invoice.deleteAll();
  };

  return { createInvoice, deleteInvoice };
}
