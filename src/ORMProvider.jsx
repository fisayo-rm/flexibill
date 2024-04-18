import { useEffect, useState } from "react";
import orm from "./models";

import PropTypes from "prop-types";
import { ORMContext } from "./ORMContext";
import InvoiceService from "./services/InvoiceService";

export const ORMProvider = ({ children }) => {
  // using null instead orm.getEmptyState() so we can initialize state with a falsy value
  const [state, setState] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchState = async () => {
      const session = orm.session(state);
      const invoices = await InvoiceService.getInvoices();
      invoices.forEach((invoice) => {
        session.Invoice.upsert(invoice);
      });
      setState(session.state);
    };
    if (!state) {
      fetchState();
    }
  }, [state]);

  return (
    <ORMContext.Provider value={{ state, setState, errors, setErrors }}>
      {children}
    </ORMContext.Provider>
  );
};

ORMProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
