import { Outlet } from "react-router";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

export default function App() {
  return (
    <div>
      <Navbar />
      <div className="min-h-[85vh] mt-28">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
