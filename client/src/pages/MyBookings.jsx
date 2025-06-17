import { useState, useEffect } from "react";
import Title from "../components/Title";
import { toast } from "react-hot-toast";
import { useAppContext } from "../context/AppContext.jsx";

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingBookingId, setLoadingBookingId] = useState(null);
  const { axios, getToken, user } = useAppContext();

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/bookings/user", {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });

      if (data.success) {
        setBookings(data.bookings);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteBooking = async (bookingId) => {
    try {
      setLoadingBookingId(bookingId);
      const { data } = await axios.delete("/api/bookings/delete", {
        headers: { Authorization: `Bearer ${await getToken()}` },
        data: { bookingId },
      });
      if (data.success) {
        fetchBookings();
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingBookingId(null);
    }
  };

  useEffect(() => {
    if (user) {
      fetchBookings();
    }
  }, [user]);

  return (
    <div className="py-28 md:pb-35 md:pt-32 px-4 md:px-16 lg:px24 xl:px-32">
      <Title
        title="My Bookings"
        subtitle="Easily manage your past, current and upcoming hotel reservations in one place. Plan you trips seamlessly with just a few clicks."
        align="left"
      />

      <div className="max-w-7xl mt-8 ">
        <div className="hidden md:grid md:grid-cols-[3fr_2fr_1fr] w-full border-b border-gray-300 font-medium text-base py-3">
          <div className="w-1/3">Hotels</div>
          <div className="w-1/3">Date & Timings</div>
          <div className="w-1/3">Payment</div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <span className="inline-block w-10 h-10 border-4 border-gray-400 border-t-transparent rounded-full animate-spin"></span>
          </div>
        ) : bookings.length === 0 ? (
          <div className="text-center text-gray-500 py-12 text-lg">
            No bookings made yet.
          </div>
        ) : (
          bookings.map((booking) => (
            <div
              key={booking._id}
              className="grid grid-col-1 md:grid-cols-[3fr_2fr_1fr] gap-x-2.5 w-full border-b border-gray-300 py-6 first:border-t"
            >
              {/* Hotel Details */}
              <div className="flex flex-col md:flex-row">
                <img
                  src={booking.room.images[0]}
                  alt="room-image"
                  className={`min-md:w-54 rounded shadow object-cover ${
                    booking.status === "Cancelled" ? "grayscale" : ""
                  }`}
                />
                <div className="flex flex-col gap-3 max-md:mt-3 min-md:ml-4">
                  <p className="font-playfair text-2xl flex flex-wrap gap-1 items-center">
                    {booking.hotel.name}
                    <span className="font-inner text-sm ml-2 whitespace-nowrap">
                      ({booking.room.roomType})
                    </span>
                  </p>
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <img src="locationIcon.svg" alt="location-icon" />
                    <span>{booking.hotel.address}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <img src="guestsIcon.svg" alt="guests-icon" />
                    <span>{booking.guests}</span>
                  </div>
                  <p className="text-base">Total: ${booking.totalPrice}</p>
                </div>
              </div>

              {/* Date and Time */}
              <div className="flex flex-row md:items-center md:gap-12 mt-3 gap-8">
                <div>
                  <p>Check-In:</p>
                  <p className=" text-gray-500 text-sm">
                    {new Date(booking.checkInDate).toDateString()}
                  </p>
                </div>
                <div>
                  <p>Check-Out:</p>
                  <p className=" text-gray-500 text-sm">
                    {new Date(booking.checkOutDate).toDateString()}
                  </p>
                </div>
              </div>

              {/* Payment Status */}
              <div className="flex flex-col items-start justify-center pt-3">
                <div className="flex items-center gap-2">
                  <div
                    className={`h-3 w-3 rounded-full ${
                      booking.status === "Cancelled"
                        ? "bg-gray-500"
                        : booking.isPaid
                        ? "bg-green-500"
                        : "bg-red-500"
                    }`}
                  ></div>
                  <p
                    className={`h-3 w-3 rounded-full ${
                      booking.status === "Cancelled"
                        ? "text-gray-500"
                        : booking.isPaid
                        ? "text-green-500"
                        : "text-red-500"
                    } mb-2.5`}
                  >
                    {booking.status === "Cancelled"
                      ? "Cancelled"
                      : booking.isPaid
                      ? "Paid"
                      : "Unpaid"}
                  </p>
                </div>
                <div className="flex gap-2">
                  {!booking.isPaid && (
                    <button
                      className={`${
                        booking.status === "Cancelled"
                          ? "hidden"
                          : "px-4 py-1.5 mt-4 text-sm border border-gray-400 rounded-full bg-gray-500 text-white hover:bg-gray-900 hover:text-white transition-all cursor-pointer"
                      }`}
                    >
                      Pay Now
                    </button>
                  )}
                  {!booking.isPaid && (
                    <button
                      disabled={loadingBookingId === booking._id}
                      onClick={() => deleteBooking(booking._id)}
                      className={`${
                        booking.status === "Cancelled"
                          ? "hidden"
                          : "w-[87px] px-4 py-1.5 mt-4 text-sm border border-gray-400 rounded-full hover:bg-gray-900 hover:text-white transition-all flex items-center justify-center"
                      } ${
                        loadingBookingId === booking._id
                          ? "cursor-not-allowed"
                          : "cursor-pointer"
                      }`}
                    >
                      {loadingBookingId === booking._id ? (
                        <span className="inline-block w-5 h-5 border-[3px] border-gray-400 border-t-transparent rounded-full animate-spin"></span>
                      ) : (
                        "Cancel"
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default MyBookings;
