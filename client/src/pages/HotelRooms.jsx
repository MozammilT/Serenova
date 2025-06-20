import { useState, useMemo, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import Star from "../components/StarRating";
import Title from "../components/Title";
import { facilityIcons } from "../constants/assets";
import { useAppContext } from "../context/AppContext.jsx";
import { toast } from "react-hot-toast";

const CheckBox = ({ label, selected = false, onChange = () => {} }) => {
  return (
    <label className="flex gap-3 items-center cursor-pointer mt-2 text-sm">
      <input
        type="checkbox"
        checked={selected}
        onChange={(e) => onChange(e.target.checked, label)}
      />
      <span className="font-light select-none">{label}</span>
    </label>
  );
};

const RadioButton = ({ label, selected = false, onChange = () => {} }) => {
  return (
    <label className="flex gap-3 items-center cursor-pointer mt-2 text-sm">
      <input
        type="radio"
        name="sortBy"
        checked={selected}
        onChange={() => onChange(label)}
      />
      <span className="font-light select-none">{label}</span>
    </label>
  );
};

function HotelRooms() {
  const { hotelId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const { currency, navigate, axios } = useAppContext();
  const [openFilter, setOpenFilter] = useState(false);
  const [hotelRooms, setHotelRooms] = useState([]);
  const hotelName = hotelRooms[0]?.hotel.name || "Hotel name";
  const hotelAdd = hotelRooms[0]?.hotel.address || "Can't fetch address";
  const [loading, setLoading] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    roomType: [],
    priceRange: [],
  });
  const [selectedSort, setSelectedSort] = useState("");

  const roomTypes = ["Single Bed", "Double Bed", "Luxury Room", "Family Suite"];
  const priceRange = [
    "0 to 500",
    "500 to 1000",
    "1000 to 2000",
    "2000 to 3000",
  ];
  const sortBy = ["Price Low to High", "Price High to Low", "Newest First"];

  const SkeletonCard = () => (
    <div className="flex flex-col md:flex-row items-start py-10 gap-6 border-b border-gray-300 last:pb-30 last:border-0 animate-pulse">
      <div className="md:w-1/2 h-[250px] rounded-xl bg-gray-200 shadow-lg"></div>

      <div className="md:w-1/2 flex flex-col gap-2">
        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        <div className="h-6 bg-gray-200 rounded w-3/4 my-1"></div>

        <div className="flex items-center gap-2">
          <div className="h-4 w-24 bg-gray-200 rounded"></div>
          <div className="h-4 w-32 bg-gray-200 rounded"></div>
        </div>

        <div className="flex items-center gap-2 mt-2">
          <div className="h-4 w-6 bg-gray-200 rounded"></div>
          <div className="h-4 w-full bg-gray-200 rounded"></div>
        </div>

        <div className="flex flex-wrap items-center mt-4 mb-6 gap-4">
          {Array(4)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100"
              >
                <div className="w-5 h-5 bg-gray-200 rounded"></div>
                <div className="h-4 w-20 bg-gray-200 rounded"></div>
              </div>
            ))}
        </div>

        {/* Price Section */}
        <div className="flex items-center gap-2">
          <div className="h-4 w-32 bg-gray-200 rounded"></div>
          <div className="h-4 w-20 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  );

  //Function to fetch all room from a partiicuular hotel
  const fetchHotelRooms = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/rooms/hotel", {
        params: { hotelId },
      });
      if (data.success) {
        setHotelRooms(data.hotelRooms);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.log("Error in fetchHotelRooms function: ", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHotelRooms();
  }, [hotelId]);

  //Function to handle the filter change
  function handleFilterChange(checked, value, type) {
    setSelectedFilters((prevValue) => {
      const updatedFilters = { ...prevValue };
      if (checked) {
        updatedFilters[type].push(value);
      } else {
        updatedFilters[type] = updatedFilters[type].filter(
          (item) => item !== value
        );
      }
      return updatedFilters;
    });
  }

  //Function to handle to handle the sort change
  function handleSortChange(sortOption) {
    setSelectedSort(sortOption);
  }

  //Function to check if a rokm matches the selected room types
  function matchedRoomType(room) {
    return (
      selectedFilters.roomType.length === 0 ||
      selectedFilters.roomType.includes(room.roomType)
    );
  }

  //Function to check if the room matches the selected price range
  function matchedPriceRange(room) {
    return (
      selectedFilters.priceRange.length === 0 ||
      selectedFilters.priceRange.some((range) => {
        const [min, max] = range.split(" to ").map(Number);
        return room.pricePerNight >= min && room.pricePerNight <= max;
      })
    );
  }

  //Function to sort room based on the selected sort options
  function sortRooms(a, b) {
    if (selectedSort === "Price Low to High") {
      return a.pricePerNight - b.pricePerNight;
    }
    if (selectedSort === "Price High to Low") {
      return b.pricePerNight - a.pricePerNight;
    }
    if (selectedSort === "Newest First") {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
    return 0;
  }

  //Function to filter Destination
  function filterDestination(room) {
    const destination = searchParams.get("destination");
    if (!destination) return true;
    return room.hotel.city.toLowerCase().includes(destination.toLowerCase());
  }

  //Function to filter and sort room based on selected filters and sort options
  const filteredRooms = useMemo(() => {
    return hotelRooms
      .filter(
        (room) =>
          matchedRoomType(room) &&
          matchedPriceRange(room) &&
          filterDestination(room)
      )
      .sort(sortRooms);
  }, [hotelRooms, selectedFilters, selectedSort, searchParams]);

  // Function to clear all filters
  function clearFilters() {
    setSelectedFilters({
      roomType: [],
      priceRange: [],
    });
    setSelectedSort("");
    setSearchParams({});
  }

  return (
    <div className="flex flex-col-reverse lg:flex-row items-start justify-between pt-28 md:pt-35 px-4 md:px-16 lg:px-24 xl:px-32">
      <div>
        <Title
          title={`Rooms at ${hotelName}`}
          subtitle={`${hotelAdd}`}
          align="left"
        />
        {loading ? (
          Array(4)
            .fill(0)
            .map((_, index) => <SkeletonCard key={index} />)
        ) : filteredRooms.length === 0 && !loading ? (
          <div className="flex items-center justify-center min-h-[300px] text-center text-base font-medium text-gray-800">
            NO ROOMS MATCHED YOUR FILTERS
          </div>
        ) : (
          filteredRooms.map((room) => {
            return (
              <div
                key={room._id}
                className="flex flex-col md:flex-row items-start py-10 gap-6 border-b border-gray-300 last:pb-30 last:border-0"
              >
                <img
                  onClick={() => {
                    navigate(`/rooms/${room._id}`);
                    scrollTo(0, 0);
                  }}
                  src={room.images[1]}
                  alt="room-image"
                  title="View Room Details"
                  className="max-h-65 md:w-1/2 rounded-xl shadow-lg object-cover cursor-pointer"
                />
                <div className="md:w-1/2 flex flex-col gap-2">
                  <p className="text-gray-500">{room.hotel.city}</p>
                  <p
                    className="text-gray-800 text-3xl font-playfair cursor-pointer"
                    onClick={() => {
                      navigate(`/rooms/${room._id}`);
                      scrollTo(0, 0);
                    }}
                  >
                    {room.roomType}
                  </p>
                  <div className="flex items-center">
                    <Star rating={room.hotel.rating} />
                    <p className="ml-2">200+ Review</p>
                  </div>
                  <div className="flex flex-wrap items-center mt-3 mb-6 gap-4">
                    {room.amenities.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg"
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
                  <div>
                    <p className="text-xl font-medium text-gray-700">
                      ${room.pricePerNight}/night
                    </p>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Filters */}
      <div className="bg-white w-80 border border-gray-300 text-gray-600 max-lg:mb-8 min-lg:mt-16">
        <div
          className={`flex items-center justify-between px-5 py-2.5 min-lg:border-b border-gray-300 ${
            openFilter && "border-b"
          }`}
        >
          <p className="text-base font-medium text-gray-800">FILTERS</p>
          <div className="text-xs cursor-pointer">
            <span
              onClick={() => setOpenFilter(!openFilter)}
              className="lg:hidden"
            >
              {openFilter ? "HIDE" : "SHOW"}
            </span>
            <span onClick={clearFilters} className="hidden lg:block">
              CLEAR
            </span>
          </div>
        </div>
        <div
          className={`${
            openFilter ? "h-auto" : "h-0 lg:h-auto"
          } overflow-hidden transition-all duration-700`}
        >
          <div className="px-5 pt-5">
            <p className="font-medium text-gray-800 pb-2">Popular Filters</p>
            {roomTypes.map((room, index) => (
              <CheckBox
                label={room}
                key={index}
                selected={selectedFilters.roomType.includes(room)}
                onChange={(checked) =>
                  handleFilterChange(checked, room, "roomType")
                }
              />
            ))}
          </div>
          <div className="px-5 pt-5">
            <p className="font-medium text-gray-800 pb-2">Price Range</p>
            {priceRange.map((range, index) => (
              <CheckBox
                label={`${currency} ${range}`}
                key={index}
                selected={selectedFilters.priceRange.includes(range)}
                onChange={(checked) =>
                  handleFilterChange(checked, range, "priceRange")
                }
              />
            ))}
          </div>
          <div className="px-5 pt-5 pb-7">
            <p className="font-medium text-gray-800 pb-2">Sort By</p>
            {sortBy.map((sort, index) => (
              <RadioButton
                label={sort}
                key={index}
                selected={selectedSort === sort}
                onChange={() => handleSortChange(sort)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HotelRooms;
