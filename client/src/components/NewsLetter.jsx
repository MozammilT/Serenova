import { useState } from "react";
import Title from "./Title";
import { toast } from "react-hot-toast";
import { useAppContext } from "../context/AppContext.jsx";

function NewsLetter() {
  const [email, setEmail] = useState();
  const [loading, setLoading] = useState(false);
  const { axios } = useAppContext();
  const [subscribed, setSubsscribed] = useState(false);

  const submitHandler = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post("/api/email/send", { email });
      if (data.success) {
        // toast.success(data.message);
        // toast.success("You have been subscribed!", {
        //   position: "bottom-right",
        //   style: {
        //     borderRadius: "10px",
        //     background: "#333",
        //     color: "#fff",
        //   },
        // });
        setSubsscribed(true);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center max-w-5xl lg:w-full rounded-2xl px-4 py-12 md:py-16 mx-2 lg:mx-auto my-20 bg-gray-900 text-white">
      <Title
        title="Never Miss a Deal"
        subtitle="Subscribe to get the latest offers, new arrivals, and exclusive
          discounts"
      />
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-6">
        <input
          type="text"
          onChange={(e) => setEmail(e.target.value)}
          className="bg-white/10 px-4 py-2.5 border border-white/20 rounded outline-none max-w-96 w-[330px]"
          placeholder="Enter your email"
        />
        <button
          onClick={submitHandler}
          disabled={loading}
          className=" group flex items-center justify-center gap-2 group bg-black px-4 md:px-7 py-2.5 rounded active:scale-95 transition-all cursor-pointer"
        >
          {loading ? (
            <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
          ) : subscribed ? (
            "You're subscribed"
          ) : (
            "Subscribe"
          )}
          <img
            src="/arrowIcon.svg"
            alt="arrow-icon"
            className="group-hover:translate-x-1 transition-all invert"
          />
        </button>
      </div>
      <p className="text-gray-500 mt-6 text-xs text-center">
        By subscribing, you agree to our Privacy Policy and consent to receive
        updates.
      </p>
    </div>
  );
}

export default NewsLetter;
