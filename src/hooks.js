import { useContext, useCallback, useMemo } from "react";
import { ORMContext } from "./ORMContext";
import orm from "./models";
import dayjs from "dayjs";
import InvoiceService from "./services/InvoiceService";

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
  // TODO: update when team state has been created
  const team = {};

  return () => {
    const invoice = {
      issuedAt: dayjs().format("YYYY-MM-DD"),
      dueAt: dayjs().format("YYYY-MM-DD"),
      invoiceNumber: "Invoice-01",
      lateFee: team.invoiceLateFee || 0.5,
      currency: "USD",
    };
    const session = orm.session(state);
    const newInvoice = session.Invoice.create(invoice);
    setState(session.state);
    InvoiceService.createInvoice(newInvoice.ref);
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
  const errorManager = useErrors();
  return (id, data) => {
    const session = orm.session(state);
    const invoice = session.Invoice.withId(id);
    if (!invoice) {
      throw new Error(`Invoice with id ${id} not found`);
    }
    invoice.update(data);

    InvoiceService.updateInvoice(invoice.ref)
      .then(() => {
        setState(session.state);
      })
      .catch((err) => {
        errorManager.set(err.errors);
        setState((prev) => {
          return prev;
        });
      });
    return invoice;
  };
};

export const useErrors = () => {
  const { errors, setErrors } = useORM();

  const errorManager = {
    set: useCallback(
      (newErrors) => {
        setErrors(newErrors);
      },
      [setErrors],
    ),

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
    }, [setErrors]),

    errors: useMemo(() => errors, [errors]),
  };

  return errorManager;
};
