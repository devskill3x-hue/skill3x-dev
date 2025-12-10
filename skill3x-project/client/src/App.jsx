// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/home";
import Profile from "./pages/profile";
import AppLayout from "./components/AppLayout"; 
import Courses from "./pages/Courses";
import GemsPage from "./pages/GemsPage";
import transactions from "./pages/Transaction";
import Transactions from "./pages/Transaction";

// Only allow if logged IN
const RequireAuth = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/Login" replace />;
  }
  return children;
};

// Only allow if logged OUT
const RequireGuest = ({ children }) => {
  const token = localStorage.getItem("token");
  if (token) {
    return <Navigate to="/home" replace />;
  }
  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public pages */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/Dashboard" element={<Dashboard />} />

        {/* Auth pages */}
        <Route
          path="/Signup"
          element={
            <RequireGuest>
              <Signup />
            </RequireGuest>
          }
        />
        <Route
          path="/Login"
          element={
            <RequireGuest>
              <Login />
            </RequireGuest>
          }
        />

        {/* ===== PRIVATE PAGES WITH GLOBAL SIDEBAR ===== */}
        <Route
          element={
            <RequireAuth>
              <AppLayout />
            </RequireAuth>
          }
        >
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route
          path="/courses"
          element={
            <RequireAuth>
              <Courses />
            </RequireAuth>
          }
        />
        <Route
          path="/gems"
          element={
            <RequireAuth>
              <GemsPage />
            </RequireAuth>
          }
        />
        <Route
          path="/transactions"
          element={
            <RequireAuth>
              <Transactions />
            </RequireAuth>
          }
        />

          {/* Optional: create these pages later */}
          {/* <Route path="/courses" element={<Courses />} /> */}
          {/* <Route path="/buy-webinar" element={<BuyWebinar />} /> */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
