import "./styles/App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Homepage from "./pages/Home.jsx";
import Footer from "./components/Footer.jsx";
import AllRooms from "./pages/AllRooms.jsx";

function App() {
  const isOwnerPath = useLocation().pathname.includes("owner");
  return (
    <div>
      {!isOwnerPath && <Navbar />}
      <div className="min-h-[70vh]">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/rooms" element={<AllRooms />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
