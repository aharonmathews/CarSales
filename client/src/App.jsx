import SignIn from "./pages/signUp";
import UserHome from "./pages/userHome"
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";


function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<UserHome />} />
          <Route path="/signIn" element={<SignIn />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
