import { useNavigate, Outlet, useLocation } from "react-router-dom";
import Footer from "./Footer";
import { useEffect } from "react";

function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === "/") {
      navigate("/invoices");
    }
  }, [navigate, location]);

  return (
    <div>
      <div className="container app__content">
        <div className="row justify-content-center">
          <div className="d-flex flex-column justify-content-between col-12 min-vh-100 pt-5 pb-2">
            <Outlet />
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Dashboard;
