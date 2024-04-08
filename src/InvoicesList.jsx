import EmptyState from "./EmptyState";

function InvoicesList() {
  const invoices = [];
  return (
    <div className="table-responsive">
      {!invoices ? (
        <div className="col-12">Loading</div>
      ) : invoices && invoices.length ? (
        <table className="table table--card table-hover">Invoice List</table>
      ) : (
        <EmptyState content="Nothing here yet" />
      )}
    </div>
  );
}

export default InvoicesList;
