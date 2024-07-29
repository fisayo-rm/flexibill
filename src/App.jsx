import Dashboard from "./Dashboard";
import "./App.scss";
import { Route, Routes } from "react-router-dom";
import Invoices from "./Invoices";
import Invoice from "./Invoice";
import { StoreProvider } from "react-context-orm";

function App() {
  return (
    <StoreProvider>
      <div className="min-vh-50">
        <Routes>
          <Route path="/" element={<Dashboard />}>
            <Route path="/invoices" element={<Invoices />} />
            <Route path="/invoice" element={<Invoice />} />
          </Route>
        </Routes>
      </div>
    </StoreProvider>
  );
}

export default App;
