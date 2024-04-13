import { createContext, useReducer } from "react";
import orm from "./models";
import dayjs from "dayjs";

export const ORMContext = createContext(null);

const ormReducer = (state, action) => {
  const session = orm.session(state);
  let newInvoice;
  switch (action.type) {
    case "ADD_INVOICE":
      console.log("ADD INVOICE", action);
      action.payload = {
        issuedAt: dayjs().format("YYYY-MM-DD"),
        dueAt: dayjs().format("YYYY-MM-DD"),
        invoiceNumber: "Invoice-01",
        lateFee: "N/A",
        currency: "USD",
      };
      newInvoice = session.Invoice.create(action.payload);
      console.log("NEW INVOICE", newInvoice);
      // async/network/database call
      break;
    default:
      break;
  }
  return session.state;
};

import PropTypes from "prop-types";

export const ORMProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ormReducer, orm.getEmptyState());

  return (
    <ORMContext.Provider value={{ state, dispatch }}>
      {children}
    </ORMContext.Provider>
  );
};

ORMProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
