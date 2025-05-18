import React from "react";
import { cities } from "../constants/assets";

function Hero() {
  return (
    <div className="flex flex-col items-start justify-center px-6 md:px-16 lg:px-24 xl:px-32 text-white bg-[url(/heroImage.png)] bg-no-repeat bg-cover bg-center h-screen">
      <p className="bg-[#49B9FF]/50 py-1 px-3.5 rounded-full mt-20">
        The Ultimate Hotel Experience
      </p>
      <h1 className="font-playfair text-5xl md:text-6xl md:leading-[56px] font-bold md:font-extrabold max-w-2xl mt-4">
        Discover Your Perfect Getaway Destination
      </h1>
      <p className="mt-4 max-w-lg text-sm md:text-base">
        Unparalleled luxury and comfort await at the world's most exclusive
        hotels and resorts. Start your journey today.
      </p>
      <form className="bg-white text-gray-500 rounded-lg px-6 py-4 mt-9 flex flex-col md:flex-row max-md:items-start gap-4 max-md:mx-auto">
        <div>
          <div className="flex items-center gap-2">
            <img src="/calenderIcon.svg" className="h-4" />
            <label htmlFor="destinationInput">Destination</label>
          </div>
          <input
            list="destinations"
            id="destinationInput"
            type="text"
            className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none"
            placeholder="Type here"
            required
          />
          <datalist id="destinations">
            {cities.map((city, index) => {
              return <option value={city} key={index} />;
            })}
          </datalist>
        </div>

        <div>
          <div className="flex items-center gap-2">
            <img src="/calenderIcon.svg" className="h-4" />
            <label htmlFor="checkIn">Check in</label>
          </div>
          <input
            id="checkIn"
            type="date"
            className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none"
          />
        </div>

        <div>
          <div className="flex items-center gap-2">
            <img src="/calenderIcon.svg" className="h-4" />
            <label htmlFor="checkOut">Check out</label>
          </div>
          <input
            id="checkOut"
            type="date"
            className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none"
          />
        </div>

        <div className="flex md:flex-col max-md:gap-2 max-md:items-center">
          <label htmlFor="guests">Guests</label>
          <input
            min={1}
            max={4}
            id="guests"
            type="number"
            className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none  max-w-16"
            placeholder="0"
          />
        </div>

        <button className="flex items-center justify-center gap-1 rounded-md bg-black py-3 px-4 text-white my-auto cursor-pointer max-md:w-full max-md:py-1">
          <img src="/searchIcon.svg" />
          <span>Search</span>
        </button>
      </form>
    </div>
  );
}

export default Hero;
