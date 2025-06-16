import { useState, useEffect } from "react";
import RoomCard from "./RoomCard";
import Title from "./Title";
import { useAppContext } from "../context/AppContext.jsx";

function RecommendedHotel() {
  const { rooms, searchedCities } = useAppContext();
  const [recommended, setRecommended] = useState([]);

  const filterHotels = () => {
    const filteredHotels = rooms.filter((room) =>
      searchedCities.includes(room.hotel.city)
    );
    setRecommended(filteredHotels);
  };

  useEffect(() => {
    filterHotels();
  }, [rooms, searchedCities]);

  return (
    recommended.length > 0 && (
      <div className="flex flex-col items-center px-6 md:px-16 lg:px-24 pt-20">
        <Title
          title="Recommended Hotels"
          subtitle="Discover our handpicked selection of exceptional properties around the world, offering unparalleled luxury and unforgettable experiences."
        />
        <div className="flex flex-wrap items-center justify-center gap-6 mt-20">
          {recommended.slice(0, 4).map((room, index) => (
            <RoomCard key={room._id} room={room} index={index} />
          ))}
        </div>
      </div>
    )
  );
}

export default RecommendedHotel;
