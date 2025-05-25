import { useState } from "react";
import Title from "../../components/Title";

function AddRoom() {
  const [images, setImages] = useState({
    1: null,
    2: null,
    3: null,
    4: null,
  });
  const [inputs, setInputs] = useState({
    rommType: "",
    pricePerNight: 0,
    amenities: {
      "Free Wifi": false,
      "Free Breakfast": false,
      "Room Service": false,
      "Mountain View": false,
      "Pool Access": false,
    },
  });

  return (
    <form>
      <Title
        align="left"
        font="Outfit"
        title="Add Rooms"
        subtitle="Fill in the details carefully and accurate room details, pricing and amenities to enhance the user booking experience."
      />

      {/* Upload Area for images */}
      <p className="text-gray-800 mt-10 text-xl">Images</p>
      <div className="grid grid-cols-2 sm:flex gap-4 my-2 flex-wrap">
        {Object.keys(images).map((key) => (
          <label htmlFor={`images${key}`} key={key}>
            <img
              src={
                images[key]
                  ? URL.createObjectURL(images[key])
                  : "/uploadArea.svg"
              }
              className="max-h-15 cursor-pointer opacity-80"
            />
            <input
              type="file"
              accept="image/*"
              hidden
              id={`images${key}`}
              onChange={(e) =>
                setImages({ ...images, [key]: e.target.files[0] })
              }
            />
          </label>
        ))}
      </div>

      {/* Room Types */}
      <div className="w-full flex max-sm:flex-col sm:gap-4 mt-4">
        <div className="flex-1 max-w-48">
          <p className="text-gray-800 mt-4">Room Type</p>
          <select
            onChange={(e) => setInputs({ ...inputs, roomType: e.target.value })}
            value={inputs.rommType}
            className="border opacity-70 border-gray-300 mt-1 rounded p-2 w-full"
          >
            <option value="" disabled defaultValue>
              Select a Room
            </option>
            <option value="Single Bed">Single Bed</option>
            <option value="Double Bed">Double Bed</option>
            <option value="Luxury Room">Luxury Room</option>
            <option value="Family Suite">Family Suite</option>
            <option value="Single Bed">Single Bed</option>
          </select>
        </div>

        <div>
          <p className="mt-4 text-gray-800">
            Price <span className="text-xs">/night</span>
          </p>
          <input
            type="number"
            placeholder="0"
            value={inputs.pricePerNight}
            onChange={(e) =>
              setInputs({ ...inputs, pricePerNight: e.target.value })
            }
            className="border border-gray-300 mt-1 rounded p-2 w-24"
          />
        </div>
      </div>

      {/* Amenities */}
      <p className="text-gray-800 mt-4">Amenities</p>
      <div className="flex flex-col flex-wrap mt-1 text-gray-400 max-w-sm">
        {Object.keys(inputs.amenities).map((amenity, index) => (
          <div key={index}>
            <input
              type="checkbox"
              id={`amenities${index + 1}`}
              checked={inputs.amenities[amenity]}
              onChange={() =>
                setInputs({
                  ...inputs,
                  amenities: {
                    ...inputs.amenities,
                    [amenity]: !inputs.amenities[amenity],
                  },
                })
              }
            />
            <label htmlFor={`amenities${index + 1}`} className="ml-2">
              {amenity}
            </label>
          </div>
        ))}
      </div>
      <button className="bg-primary text-white px-8 py-2 rounded mt-8 cursor-pointer">
        Add Room
      </button>
    </form>
  );
}

export default AddRoom;
