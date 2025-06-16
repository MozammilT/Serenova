// import { roomsDummyData } from "../constants/assets";
import { useState, useEffect } from "react";
import Hotelcard from "./HotelCard";
import Title from "./Title";
// import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext.jsx";
// import { toast } from "react-hot-toast";

function Featuredest() {
  const { hotels, navigate } = useAppContext();

  return (
    hotels.length > 0 && (
      <div className="flex flex-col items-center px-6 md:px-16 lg:px-20 bg-slate-50 pt-20">
        <Title
          title="Featured Destinations"
          subtitle="Discover our handpicked selection of exceptional properties around the world, offering unparalleled luxury and unforgettable experiences."
        />
        <div className="flex flex-wrap items-center justify-center gap-6 mt-20">
          {hotels.slice(0, 4).map((hotel, index) => (
            <Hotelcard key={hotel._id} room={hotel} index={index} />
          ))}
        </div>
        <button
          onClick={() => {
            navigate("/hotels");
            scrollTo(0, 0);
          }}
          className="my-16 px-4 py-2 text-sm font-medium border border-gray-300 rounded bg-white hover:bg-gray-100 transition-all cursor-pointer"
        >
          View All Destinations
        </button>
      </div>
    )
  );
}

export default Featuredest;
