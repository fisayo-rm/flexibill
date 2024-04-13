import { useContext } from "react";
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
