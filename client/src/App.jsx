import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserHome from "./user/userHome";
import SearchResults from "./user/searchResults";
import SignIn from "./user/signUp";
import WishList from "./user/wishList";
import CarDetails from "./user/car-details"; 
import CompareCars from './user/CompareCars';
import MakeAnOffer from './user/MakeAnOffer';
import Profile from "./user/userProfile";
import DealershipSignIn from "./dealership/dealerLogin";
import Feedback from "./user/Feedback";
import UserEmails from "./dealership/UserEmails";
import loadingGif from './assets/Loadingcar.gif'; // Ensure you have a loading GIF in your assets folder
import DealerRoutes from "./dealership/DealerRoutes";

function App() {
  const [loading, setLoading] = useState(true);

  // Simulate a loading delay (e.g., for fetching user data or initializing app)
  useEffect(() => {
    setTimeout(() => {
      setLoading(false); // Set loading to false after 2 seconds (you can adjust this delay)
    }, 2000);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <img src={loadingGif} className="w-32 h-32" />
      </div>
    );
  }


  return (
    <Router>
      <Routes>
        {/* For normal user */}
        
        <Route path="/" element={<UserHome />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/carDetails/" element={<CarDetails />} /> 
        <Route path="/wishlist" element={<WishList />} />
        <Route path="/compareCars" element={<CompareCars />} />
        <Route path="/makeAnOffer" element={<MakeAnOffer />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/Feedback" element={<Feedback />} />

        {/* For dealership */}
        
        <Route path="/dealershipLogin" element={<DealershipSignIn />} />
        <Route path="/dealership/*" element={<DealerRoutes />} />
        
        
        {/* Why is this here? */}
        <Route path="/UserEmails" element={<UserEmails />} />
      </Routes>
    </Router>
  );
}

export default App;
