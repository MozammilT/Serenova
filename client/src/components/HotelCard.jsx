import { Link } from "react-router-dom";

function Hotelcard({ room, index }) {
  return (
    <Link
      to={"/hotel/" + room.hotel}
      onClick={() => scrollTo(0, 0)}
      key={room._id}
      className="relative w-[315px] rounded-xl overflow-hidden bg-grey-100 text-gray-500/90 shadow-[0px_4px_4px_rgba(0,0,0,0.05)]"
    >
      <img src={room.images[0]} alt="" className="w-full h-45 object-cover" />
      {index % 2 === 0 && (
        <p className="px-3 py-1 absolute top-3 left-3 text-xs bg-white text-gray-800 font-medium rounded-full">
          Best Seller
        </p>
      )}
      <div className="p-4 pt-5">
        <div className="flex items-center justify-between">
          <p className="font-playfair text-xl font-medium text-gray-800">
            {room.hotelDetails.name}
          </p>
          <div className="flex items-center gap-1">
            <img src="/starIconFilled.svg" alt="star-icon" />
            4.5
          </div>
        </div>
        <div className="flex items-center gap-1 text-sm">
          <img src="/locationIcon.svg" alt="loocation-icon" />
          <p className="text-base"> {room.hotelDetails.city} </p>
        </div>
        <div className="flex items-center justify-between mt-2">
          <div className="flex justify-start gap-1 items-center">
            <p>Starting from</p>
            <p className="text-base">
              <span className="text-xl text-gray-800">
                ${room.pricePerNight}
              </span>
              /night
            </p>
          </div>
          <button className="px-4 py-2 text-sm font-medium border border-gray-300 rounded hover:bg-gray-700 hover:text-white transition-all cursor-pointer">
            Explore
          </button>
        </div>
      </div>
    </Link>
  );
}

export default Hotelcard;
