import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  roomsDummyData,
  facilityIcons,
  roomCommonData,
} from "../constants/assets";
import Star from "../components/StarRating";

function RoomDetails() {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [mainImage, setMainImage] = useState(null);

  useEffect(() => {
    const roomId = roomsDummyData.find((room) => room._id === id);
    roomId && setRoom(roomId);
    roomId && setMainImage(roomId.images[0]);
  }, []);

  return (
    room && (
      <main className="py-28 md:py-35 px-4 md:px-16 lg:px-24 xl:px-32">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
          <h1 className="text-3xl md:text-4xl font-playfair">
            {room.hotel.name}
            <span className="font-inner text-sm ml-2">{`(${room.roomType})`}</span>
          </h1>
          <p className="text-xs font-inner py-1.5 px-3 text-white bg-orange-500 rounded-full">
            20% OFF
          </p>
        </div>
        <div className="flex items-center gap-1 mt-2">
          <Star rating={room.hotel.rating} />
          <p className="ml-2">200+ reviews</p>
        </div>
        <div className="flex items-center gap-1 text-gray-500 mt-2 text-md">
          <img src="/locationIcon.svg" />
          <span>{room.hotel.address}</span>
        </div>
        <div className="flex flex-col lg:flex-row mt-6 gap-6">
          <div className="lg:w-1/2 w-full">
            <img
              src={mainImage}
              alt="room-image"
              className="w-full rounded-xl shadow-lg object-cover"
            />
          </div>
          <div className="grid grid-cols-2 gap-4 lg:w-1/2 w-full">
            {room?.images.length > 1 &&
              room.images.map((image, index) => (
                <img
                  onClick={() => setMainImage(image)}
                  key={index}
                  src={image}
                  alt="room-image"
                  className={`w-full rounded-xl shadow-md object-contain cursor-pointer ${
                    mainImage == image && "outline-3 outline-orange-500"
                  }`}
                />
              ))}
          </div>
        </div>
        <div className="flex flex-col md:flex-row md:justify-between mt-10">
          <div className="flex flex-col">
            <h1 className="text-3xl md:text-4xl font-playfair">
              Experience Luxury Like Never Before
            </h1>
            <div className="flex flex-wrap items-center mt-3 mb-6 gap-4">
              {room.amenities.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100"
                >
                  <img
                    src={facilityIcons[item]}
                    alt={item}
                    className="w-5 h-5"
                  />
                  <p className="text-xs">{item}</p>
                </div>
              ))}
            </div>
          </div>
          <p className="text-2xl font-medium">{`$${room.pricePerNight}/night`}</p>
        </div>
        <form className="flex flex-col md:flex-row items-start md:items-center justify-between bg-white shadow-[0px_0px_20px_rgba(0,0,0,0.15)] p-6 rounded-xl mx-auto mt-16 max-w-6xl">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-15">
            <div className="text-gray-500 gap-4 md:gap-10">
              <div className="flex items-center gap-2">
                <img src="/calenderIcon.svg" className="h-4" />
                <label htmlFor="checkIn">Check in</label>
              </div>
              <input
                id="checkIn"
                type="date"
                className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none"
                required
              />
            </div>
            <div className="w-px h-20 bg-gray-300/70 max-md:hidden"></div>

            <div className="text-gray-500 gap-4 md:gap-10">
              <div className="flex items-center gap-2">
                <img src="/calenderIcon.svg" className="h-4" />
                <label htmlFor="checkOut">Check in</label>
              </div>
              <input
                id="checkOut"
                type="date"
                className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none"
                required
              />
            </div>
            <div className="w-px h-20 bg-gray-300/70 max-md:hidden"></div>
            <div className=" max-md:gap-2 max-md:items-center text-gray-500">
              <div className="flex items-center gap-2 md:flex-col">
                <label htmlFor="guests">Guests</label>
                <input
                  min={1}
                  max={4}
                  id="guests"
                  type="number"
                  className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none  max-w-16"
                  placeholder="0"
                  required
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="bg-black active:scale-95 transition-all text-white rounded-md max-md:w-full max-md mt-6 md:px-25 py-3 md:py-4 text-base cursor-pointer"
          >
            Check Availibility
          </button>
        </form>
        <div className="mt-20 space-y-4">
          {roomCommonData.map((data, index) => (
            <div key={index} className="flex items-start gap-2">
              <img
                src={data.icon}
                alt={`${data.title}-icon`}
                className="w-6.5"
              />
              <div>
                <p className="text-base">{data.title}</p>
                <p className="text-gray-500">{data.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="max-w-3xl border-y border-gray-300 my-15 py-10 text-gray-500">
          <p>
            Guests will be allocated on the ground floor according to
            availability. You get a comfortable Two bedroom apartment has a true
            city feeling. The price quoted is for two guest, at the guest slot
            please mark the number of guests to get the exact price for groups.
            The Guests will be allocated ground floor according to availability.
            You get the comfortable two bedroom apartment that has a true city
            feeling.
          </p>
        </div>

        <div className="flex flex-col items-start gap-4">
          <div className="flex gap-4">
            <img
              src={room.hotel.owner.image}
              alt="host-image"
              className="h-14 w-14 md:h-18 md:w-18 rounded-full object-contain"
            />
            <div>
              <p className="text-lg md:text-xl">
                Hosted By {room.hotel.owner.username}
              </p>
              <div className="flex items-center mt-1">
                <Star rating={room.hotel.owner.rating} />
                <p className="ml-2">150+ review</p>
              </div>
            </div>
          </div>
        </div>
        <button className=" px-6 py-2.5 mt-4 rounded text-white bg-gray-900 hover:bg-primary-dull transition-all cursor-pointer">
          Contact Now
        </button>
      </main>
    )
  );
}

export default RoomDetails;
