import "./styles/App.css";
import { useLocation } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";

function App() {
  const isOwnerPath = useLocation().pathname.includes("owner");
  return (
    <>
      {!isOwnerPath && <Navbar />}
    </>
  );
}

export default App;
