import PropTypes from "prop-types";

function EmptyState({ align = "center", content = null, children }) {
  return (
    <div className={`col-12 text-muted text-${align}`}>
      <small>{content}</small>
      <h4 className="mt-2">¯\_(ツ)_/¯</h4>
      {children}
    </div>
  );
}

EmptyState.propTypes = {
  align: PropTypes.string,
  content: PropTypes.node,
  children: PropTypes.node,
};

export default EmptyState;
