import Footer from "./Footer";
import Invoices from "./Invoices";

function Dashboard() {
  return (
    <div>
      <div className="container app__content">
        <div className="row justify-content-center">
          <div className="d-flex flex-column justify-content-between col-12 min-vh-100 pt-5 pb-2">
            <Invoices />
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
