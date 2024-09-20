import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserHome from "./pages/userHome";
import SearchResults from "./pages/searchResults";
import SignIn from "./pages/signUp";
import WishList from "./pages/wishList";
import CarDetails from "./pages/car-details"; 
import CompareCars from './pages/CompareCars';
import MakeAnOffer from './pages/MakeAnOffer';
import DealershipDashboard from './pages/dealership/DealershipDashboard';
import GarageManagement from './pages/dealership/GarageManagement';
import AddNewVehicle from './pages/dealership/AddNewVehicle';
import Profile from "./pages/userProfile";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserHome />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/wishlist" element={<WishList />} />
        <Route path="/car-details/" element={<CarDetails />} /> 
        <Route path="/compare-cars" element={<CompareCars />} />
        <Route path="/make-an-offer" element={<MakeAnOffer />} />
        <Route path="/DealershipDashboard" element={<DealershipDashboard/>} />
        <Route path="/GarageManagement/*" element={<GarageManagement/>} />  {/* Add the wildcard here */}
        <Route path="/AddNewVehicle" element={<AddNewVehicle/>} />   
        <Route path="/Profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
