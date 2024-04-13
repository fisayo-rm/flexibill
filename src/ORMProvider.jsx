import { useState } from "react";
import orm from "./models";

import PropTypes from "prop-types";
import { ORMContext } from "./ORMContext";

export const ORMProvider = ({ children }) => {
  const [state, setState] = useState(orm.getEmptyState());

  return (
    <ORMContext.Provider value={{ state, setState }}>
      {children}
    </ORMContext.Provider>
  );
};

ORMProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
