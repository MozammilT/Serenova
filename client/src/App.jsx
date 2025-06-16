import "./styles/App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Homepage from "./pages/Home.jsx";
import Footer from "./components/Footer.jsx";
import AllRooms from "./pages/AllRooms.jsx";
import RoomDetails from "./pages/RoomDetails.jsx";
import MyBookings from "./pages/MyBookings.jsx";
import HotelRegistration from "./components/HotelReg.jsx";
import Layout from "./pages/hotelOwner/Layout.jsx";
import DashBoard from "./pages/hotelOwner/Dashboard.jsx";
import AddRoom from "./pages/hotelOwner/AddRoom.jsx";
import ListRoom from "./pages/hotelOwner/ListRoom.jsx";
import { Toaster } from "react-hot-toast";
import {useAppContext} from "./context/AppContext.jsx";
import HotelRooms from "./pages/HotelRooms.jsx";

function App() {
  const isOwnerPath = useLocation().pathname.includes("owner");
  const {showHotelReg} = useAppContext()
  return (
    <div>
      <Toaster />
      {!isOwnerPath && <Navbar />}
      {showHotelReg && <HotelRegistration />}
      <div className="min-h-[70vh]">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/rooms" element={<AllRooms />} />
          <Route path="/hotel/:hotelId" element={<HotelRooms />} />
          <Route path="/rooms/:id" element={<RoomDetails />} />
          <Route path="/my-bookings" element={<MyBookings />} />
          <Route path="/owner" element={<Layout />}>
            <Route index element={<DashBoard />} />
            <Route path="add-room" element={<AddRoom />} />
            <Route path="list-room" element={<ListRoom />} />
          </Route>
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
