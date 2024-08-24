import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/navbar";
import LoginSignup from "./pages/login_signup";
import Signup from "./pages/signup";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<div>Hello</div>} />
        <Route path="/navbar" element={<Navbar />} />
        <Route path="/login_signup" element={<LoginSignup />} />
        <Route path="signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
