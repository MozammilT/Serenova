import { useState } from "react";
import Title from "../../components/Title";
import { useAppContext } from "../../context/AppContext.jsx";
import { toast } from "react-hot-toast";

function AddRoom() {
  const [images, setImages] = useState({
    1: null,
    2: null,
    3: null,
    4: null,
  });
  const [inputs, setInputs] = useState({
    roomType: "",
    pricePerNight: 0,
    amenities: {
      "Free Wifi": false,
      "Free Breakfast": false,
      "Room Service": false,
      "Mountain View": false,
      "Pool Access": false,
      "Bar Access": false,
      "Free Parking": false,
      "Restaurant": false,
    },
  });
  const [loading, setLoading] = useState(false);
  const { axios, getToken } = useAppContext();

  const submitHandler = async (e) => {
    e.preventDefault();

    // Debug logs for form values
    console.log("Submit Handler Triggered");
    console.log("inputs:", inputs);
    console.log("images:", images);

    //Check if all inputs are filled
    if (
      !inputs.roomType ||
      !inputs.pricePerNight ||
      Object.values(inputs.amenities).every((v) => !v) ||
      !Object.values(images).some((img) => img)
    ) {
      console.log("Validation failed:");
      console.log("roomType empty:", !inputs.roomType);
      console.log("pricePerNight empty:", !inputs.pricePerNight);
      console.log(
        "amenities none selected:",
        Object.values(inputs.amenities).every((v) => !v)
      );
      console.log(
        "no images selected:",
        !Object.values(images).some((img) => img)
      );
      toast.error("All fields required");
      return;
    }
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("roomType", inputs.roomType);
      formData.append("pricePerNight", inputs.pricePerNight);

      //Convert amenities to string
      const amenities = Object.keys(inputs.amenities).filter(
        (key) => inputs.amenities[key]
      );
      console.log("Selected amenities:", amenities);
      amenities.forEach((item) => {
        formData.append("amenities", item);
      });

      //Creating a Object for images
      Object.keys(images).forEach((key) => {
        if (images[key]) {
          console.log(`Appending image for key ${key}:`, images[key]);
          formData.append("images", images[key]);
        }
      });

      console.log("FormData before submit:", formData);

      const { data } = await toast.promise(
        axios.post("/api/rooms", formData, {
          headers: { Authorization: `Bearer ${await getToken()}` },
        }),
        {
          loading: "Adding room...",
          success: "Room added successfully",
          error: "Failed to add room. Please try again.",
        }
      );

      if (data.success) {
        // toast.success(data.message);
        setInputs({
          roomType: "",
          pricePerNight: 0,
          amenities: {
            "Free Wifi": false,
            "Free Breakfast": false,
            "Room Service": false,
            "Mountain View": false,
            "Pool Access": false,
            "Bar Access": false,
            "Free Parking": false,
            "Restaurant": false,
          },
        });
        setImages({
          1: null,
          2: null,
          3: null,
          4: null,
        });
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
      console.error(
        "[submitHandler] error when submitting the add room form: ",
        err
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submitHandler}>
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
            value={inputs.roomType}
            className="border opacity-70 border-gray-300 mt-1 rounded p-2 w-full"
          >
            <option value="" disabled defaultValue>
              Select a Room
            </option>
            <option value="Single Bed">Single Bed</option>
            <option value="Double Bed">Double Bed</option>
            <option value="Luxury Room">Luxury Room</option>
            <option value="Family Suite">Family Suite</option>
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
      <button
        className={`${
          loading ? "bg-[#18429e]" : " bg-primary"
        } text-white px-8 py-2 rounded mt-8 cursor-pointer`}
        disabled={loading}
      >
        {loading ? "Loading" : "Add Room"}
      </button>
    </form>
  );
}

export default AddRoom;
