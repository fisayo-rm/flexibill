import { useContext, useCallback, useState } from "react";
import { ORMContext } from "./ORMContext";
import orm from "./models";
import dayjs from "dayjs";

export const useORM = () => {
  const context = useContext(ORMContext);
  if (!context) {
    throw new Error("useORM must be used within an ORMProvider");
  }
  return context;
};

export const useInvoices = () => {
  const { state } = useORM();
  const session = orm.session(state);
  return session.Invoice.all().toRefArray();
};

export const useAddInvoices = () => {
  const { state, setState } = useORM();

  return () => {
    const invoice = {
      issuedAt: dayjs().format("YYYY-MM-DD"),
      dueAt: dayjs().format("YYYY-MM-DD"),
      invoiceNumber: "Invoice-01",
      lateFee: "N/A",
      currency: "USD",
    };
    const session = orm.session(state);
    const newInvoice = session.Invoice.create(invoice);
    setState(session.state);
    return newInvoice.ref;
  };
};

export const useInvoiceById = (id) => {
  const { state } = useORM();
  const session = orm.session(state);
  const invoice = session.Invoice.withId(id);
  return invoice;
};

export const useUpdateInvoice = () => {
  const { state, setState } = useORM();

  return (id, data) => {
    const session = orm.session(state);
    const invoice = session.Invoice.withId(id);
    if (!invoice) {
      throw new Error(`Invoice with id ${id} not found`);
    }
    invoice.update(data);
    setState(session.state);
  };
};

export const useErrors = (initialErrors = {}) => {
  const [errors, setErrors] = useState(initialErrors);

  const errorManager = {
    set: useCallback((newErrors) => {
      setErrors(newErrors);
    }, []),

    get: useCallback(
      (field) => {
        return errors[field] || null;
      },
      [errors],
    ),

    has: useCallback(
      (field) => {
        return Object.prototype.hasOwnProperty.call(errors, field);
      },
      [errors],
    ),

    clear: useCallback(() => {
      setErrors({});
    }, []),
  };

  return errorManager;
};
