import { cities } from "../constants/assets";
import { useAppContext } from "../context/AppContext.jsx";
import { useState } from "react";
import { toast } from "react-hot-toast";

function HotelRegistration() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [city, setCity] = useState("");
  const { setShowHotelReg, axios, getToken, setIsOwner } = useAppContext();

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      const { data } = await axios.post(
        "/api/hotels",
        { name, address, contact, city },
        { headers: { Authorization: `Bearer ${await getToken()}` } }
      );

      if (data.success) {
        toast.success(data.message);
        setIsOwner(true);
        setShowHotelReg(false);
      } else {
        toast.error(data.message);
        console.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
      console.error(err.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <form
        onSubmit={onSubmitHandler}
        onClick={(e) => e.stopPropagation()}
        className="flex bg-white rounded-xl max-w-4xl max-md:mx-2"
      >
        <img
          src="regImage.png"
          alt="hotel-registration-image"
          className="w-1/2 rounded-l-xl hidden md:block"
        />
        <div className="relative flex flex-col items-center md:w-1/2 p-8 md:p-10">
          <img
            src="closeIcon.svg"
            alt="close-icon"
            className="absolute top-4 right-4 h-4 w-4 cursor-pointer"
            onClick={() => setShowHotelReg(false)}
          />
          <p className="text-2xl font-semibold mt-6">Register Your Hotel</p>

          {/* Hotel Name */}
          <div className="w-full mt-4">
            <label htmlFor="name" className="font-medium text-gray-500">
              Hotel Name
            </label>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              required
              placeholder="Enter Your Hotel Name"
              className=" border border-gray-200 rounded w-full px-3 py-2.5 mt-1 outline-gray-800 font-light"
            />
          </div>

          {/* Phone */}
          <div className="w-full mt-6">
            <label htmlFor="phone" className="font-medium text-gray-500">
              Phone
            </label>
            <input
              onChange={(e) => setContact(e.target.value)}
              value={contact}
              id="phone"
              required
              type="text"
              placeholder="Enter Your Phone Number"
              className=" border border-gray-200 rounded w-full px-3 py-2.5 mt-1 outline-gray-800 font-light"
            />
          </div>

          {/* Address */}
          <div className="w-full mt-6">
            <label htmlFor="address" className="font-medium text-gray-500">
              Address
            </label>
            <input
              onChange={(e) => setAddress(e.target.value)}
              value={address}
              id="address"
              required
              type="text"
              placeholder="Enter Your Address"
              className=" border border-gray-200 rounded w-full px-3 py-2.5 mt-1 outline-gray-800 font-light"
            />
          </div>

          {/* Select City Dropdown */}
          <div className="w-full mt-6 max-w-60 mr-auto">
            <label htmlFor="city" className="font-medium text-gray-500">
              City
            </label>
            <select
              onChange={(e) => setCity(e.target.value)}
              value={city}
              id="city"
              className="border border-gray-200 rounded w-full px-3 py-2.5 mt-1 outline-gray-800 font-light"
            >
              <option>Select City</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
          <button className="bg-gray-800 hover:bg-gray-900 transition-all text-white mr-auto mt-6 px-6 py-2 rounded cursor-pointer">
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

export default HotelRegistration;
