import { useState, useEffect } from "react";
import Title from "../../components/Title";
import { useAppContext } from "../../context/AppContext.jsx";
import { toast } from "react-hot-toast";

function DashBoard() {
  const [dashboardData, setDashboardData] = useState({
    Bookings: [],
    totalBookings: 0,
    totalRevenue: 0,
    userDetail: [],
  });
  const { currency, axios, user, getToken } = useAppContext();

  const fetchDashBoardData = async () => {
    try {
      const { data } = await axios.get("/api/bookings/hotel", {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });
      if (data.success) {
        setDashboardData(data.dashBoardData);
        toast("Data fetched", {
          position: "bottom-right",
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    if (user) {
      fetchDashBoardData();
    }
  }, [user]);

  return (
    <div>
      <Title
        align="left"
        font="outfit"
        title=" Dashboard"
        subtitle="Monitor your room listings, track bookings and analyze revenue—all in one place. Stay updated with real-time insights to ensure smooth operations. "
      />
      <div className=" flex gap-4 my-8">
        {/* Total Bookings */}
        <div className="bg-primary/3 border border-primary/10 rounded flex p-4 pr-8 gap-2">
          <img
            src="totalBookingIcon.svg"
            alt="booking-icon"
            className="max-sm:hidden h-10"
          />
          <div className="flex flex-col md:ml-4 font-medium">
            <p className="text-blue-500 text-lg">Total Bookings</p>
            <p className="text-neutral-400 text-base ml-10">
              {currency}
              {dashboardData.totalBookings}
            </p>
          </div>
        </div>

        {/* Total Revenue */}
        <div className="bg-primary/3 border border-primary/10 rounded flex p-4 pr-8 gap-2">
          <img
            src="totalRevenueIcon.svg"
            alt="booking-icon"
            className="max-sm:hidden h-10"
          />
          <div className="flex flex-col md:ml-4 font-medium">
            <p className="text-blue-500 text-lg">Total Revenue</p>
            <p className="text-neutral-400 text-base ml-10">
              {currency}
              {dashboardData.totalRevenue}
            </p>
          </div>
        </div>
      </div>

      {/* Recent Bookings */}
      <h2 className="text-2xl text-blue-950/70 font-medium mb-5">
        Recent Bookings
      </h2>

      <div className="w-full max-w-3xl text-left border border-gray-300 rounded-lg max-h-80 overflow-y-scroll">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-4 text-gray-800 font-medium">User Name</th>
              <th className="py-3 px-4 text-gray-800 font-medium max-sm:hidden">
                Room Name
              </th>
              <th className="text-center py-3 px-4 text-gray-800 font-medium">
                Total Amount
              </th>
              <th className="text-center py-3 px-4 text-gray-800 font-medium">
                Payment Status
              </th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {dashboardData.userDetail.map((item, index) => (
              <tr kry={index}>
                <td className="py-3 px-4 text-gray-700 border-t border-gray-300">
                  {item.username}
                </td>
                <td className="py-3 px-4 text-gray-700 border-t border-gray-300 max-sm:hidden">
                  {item.roomType}
                </td>
                <td className="py-3 px-4 text-gray-700 border-t border-gray-300 text-center">
                  ${item.amount}
                </td>
                <td className="py-3 px-4 border-t border-gray-300 text-center">
                  <button
                    className={`py-1 px-3 text-sx rounded-full mx-auto ${
                      item.paymentStatus
                        ? "bg-green-200 text-green-600"
                        : "bg-amber-200 text-yellow-600"
                    }`}
                  >
                    {item.paymentStatus ? "Completed" : "Pending"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DashBoard;
