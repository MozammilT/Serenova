import { useState, useEffect } from "react";
import Title from "../../components/Title";
import { useAppContext } from "../../context/AppContext.jsx";
import { toast } from "react-hot-toast";

function ListRoom() {
  const [rooms, setRooms] = useState([]);
  const { axios, user, getToken } = useAppContext();

  const fetchRooms = async () => {
    try {
      console.log("Fetching rooms for user:", user);
      const { data } = await axios.get("/api/rooms/owner", {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });
      console.log("Rooms API response:", data);
      if (data.success) {
        setRooms(data.rooms);
        console.log("Rooms set in state:", data.rooms);
      } else {
        toast.error(data.message);
        console.log("Rooms fetch error:", data.message);
      }
    } catch (err) {
      toast.error(err.message);
      console.log("Error in ListRooms.jsx file: ", err.message);
    }
  };

  //Toggle availability of the room
  const toggleAvailability = async (roomId) => {
    const { data } = await axios.post(
      "/api/rooms/toggle-availibility",
      { roomId },
      { headers: { Authorization: `Bearer ${await getToken()}` } }
    );
    if (data.success) {
      toast.success(data.message);
    } else {
      toast.error(data.message);
    }
  };

  useEffect(() => {
    console.log("useEffect triggered, user:", user);
    if (user) {
      fetchRooms();
    }
  }, [user]);

  return (
    <div>
      <Title
        align="left"
        font="outfit"
        title="Room Listings"
        subtitle="View, edit or manage all listed rooms. Keep the information up-to-date to provide the best experience for the users."
      />
      <p className=" text-gray-500 mt-8">All Rooms</p>
      <div className="w-full max-w-3xl mt-3 text-left border border-gray-300 rounded-lg max-h-80 overflow-y-scroll">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-4 text-gray-800 font-medium">Type</th>
              <th className="py-3 px-4 text-gray-800 font-medium max-sm:hidden">
                Facility
              </th>
              <th className="py-3 px-4 text-gray-800 font-medium">
                Price /night
              </th>
              <th className="text-center py-3 px-4 text-gray-800 font-medium">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {rooms.map((item, index) => (
              <tr key={index}>
                <td className="py-3 px-4 text-gray-700 border-t border-gray-300">
                  {item.roomType}
                </td>
                <td className="py-3 px-4 text-gray-700 border-t border-gray-300 max-sm:hidden">
                  {item.amenities.join(", ")}
                </td>
                <td className="py-3 px-4 text-gray-700 border-t border-gray-300">
                  ${item.pricePerNight}
                </td>
                <td className="py-3 px-4 border-t border-gray-300 text-sm text-red-500 text-center">
                  <label class="relative inline-flex items-center cursor-pointer text-gray-900 gap-3">
                    <input
                      type="checkbox"
                      class="sr-only peer"
                      checked={item.isAvailable}
                      onChange={() => toggleAvailability(item._id)}
                    />
                    <div class="w-12 h-7 bg-slate-300 rounded-full peer peer-checked:bg-indigo-600 transition-colors duration-200">
                      <span class="dot absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-5"></span>
                    </div>
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ListRoom;
