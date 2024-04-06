import Invoices from "./Invoices";

function Dashboard() {
  return (
    <div>
      <div className="container app__content">
        <div className="row justify-content-center">
          <div className="d-flex flex-column justify-content-betweeb col-12 min-vh-100 pt-5 pb-2">
            <Invoices />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
