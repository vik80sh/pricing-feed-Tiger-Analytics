import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import PricingPage from "./features/pricing/PricingPage";
import { ToastContainer } from "react-toastify/unstyled";

function App() {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="app">
      <header className="app-header">
        <h1>Pricing Feed Management</h1>
        <span className="app-date">{today}</span>
      </header>

      <PricingPage />
      <ToastContainer />
    </div>
  );
}

export default App;
