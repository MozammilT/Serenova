// import { roomsDummyData } from "../constants/assets";
import { useState, useEffect } from "react";
import Hotelcard from "./HotelCard";
import Title from "./Title";
// import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext.jsx";
// import { toast } from "react-hot-toast";

function Featuredest() {
  const { hotels, navigate } = useAppContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (hotels && hotels.length > 0) {
      setLoading(false);
    }
  }, [hotels]);

  const SkeletonCard = () => (
    <div>
      <div className="relative w-[315px] rounded-xl overflow-hidden bg-grey-100 text-gray-500/90 shadow-[0px_4px_4px_rgba(0,0,0,0.05)] animate-pulse">
        <div className="w-full h-45 bg-gray-200"></div>

        <p className="px-3 py-1 absolute top-3 left-3 text-xs bg-gray-200"></p>

        <div className="p-4 pt-5">
          <div className="flex items-center justify-between">
            <p className="h-6 bg-gray-200 rounded w-1/2"></p>
            <div className="flex items-center gap-1">
              <div className="h-4 w-4 bg-gray-200 rounded"></div>
              <div className="h-4 w-4 bg-gray-200 rounded"></div>
            </div>
          </div>

          <div className="flex items-center gap-1 text-sm mt-1.5">
            <div className="h-4 w-4 bg-gray-200 rounded"></div>
            <div className="h-4 w-10 bg-gray-200 rounded"></div>
          </div>

          <div className="flex items-center justify-between mt-2">
            <div className="flex justify-start gap-1 items-center">
              <div className="h-4 w-24 bg-gray-200 rounded"></div>
              <div className="h-6 w-1/4 bg-gray-200 rounded"></div>
            </div>
            <div className="h-10 w-24 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col items-center px-6 md:px-16 lg:px-20 pt-20">
      <Title
        title="Featured Destinations"
        subtitle="Discover our handpicked selection of exceptional properties around the world, offering unparalleled luxury and unforgettable experiences."
      />
      <div className="flex flex-wrap items-center justify-center gap-6 mt-20">
        {loading
          ? Array(4)
              .fill(0)
              .map((_, index) => <SkeletonCard key={index} />)
          : hotels
              .slice(0, 4)
              .map((hotel, index) => (
                <Hotelcard key={hotel._id} room={hotel} index={index} />
              ))}
      </div>
      {!loading && (
        <button
          onClick={() => {
            navigate("/hotels");
            scrollTo(0, 0);
          }}
          className="my-16 px-4 py-2 text-sm font-medium border border-gray-300 rounded bg-white hover:bg-gray-100 transition-all cursor-pointer"
        >
          View All Destinations
        </button>
      )}
    </div>
  );
}

export default Featuredest;
