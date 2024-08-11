import SignIn from "./pages/signUp";
import UserHome from "./pages/userHome"
import SearchResults from "./pages/searchResults";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import WishList from "./pages/wishList";


function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<UserHome />} />
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/wishlist" element={<WishList />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
