import { useContext } from "react";
import { ORMContext } from "./ORMProvider";
import orm from "./models";

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
  const { dispatch } = useORM();
  return (invoice) => dispatch({ type: "ADD_INVOICE", payload: invoice });
};
