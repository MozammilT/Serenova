import axios from "axios";
import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser, useAuth } from "@clerk/clerk-react";
import { toast } from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const currency = import.meta.env.VITE_CURRENCY;
  const navigate = useNavigate();
  const { user } = useUser();
  const { getToken } = useAuth();

  const [isOwner, setIsOwner] = useState(false);
  const [showHotelReg, setShowHotelReg] = useState(false);
  const [searchedCities, setSearchedCities] = useState([]);

  const fetchUser = async () => {
    try {
      const { data } = await axios.get("/api/user", {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });

      if (data.success) {
        setIsOwner(data.role === "hotelOwner");
        setSearchedCities(data.recentSearchcities);
      } else {
        //Retry Fetching use details after 5 seconds
        setTimeout(() => {
          fetchUser();
        }, 5000);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    if (user) {
      fetchUser();
    }
  }, [user]);

  useEffect(() => {
    const debugToken = async () => {
      if (user) {
        const token = await getToken();
        console.group("JWT Token Details");
        console.log("Full Token:", token);
        console.log(
          "Token Preview:",
          `${token.slice(0, 20)}...${token.slice(-20)}`
        );
        try {
          const payload = JSON.parse(atob(token.split(".")[1]));
          console.log("Decoded Payload: ", payload);
        } catch (err) {
          console.error("Failed to decode token: ", err);
        }
        console.groupEnd();
      }
    };
    debugToken();
  }, [user, getToken]);

  const value = {
    currency,
    navigate,
    user,
    getToken,
    axios,
    isOwner,
    setIsOwner,
    showHotelReg,
    setShowHotelReg,
    searchedCities,
    setSearchedCities,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
