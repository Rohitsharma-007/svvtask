import Login from "./pages/Login";
import Register from "./pages/Register";
import NoPage from "./pages/NoPage";
import UserDetails from "./pages/UserDetails";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/userDetails/:id" element={<UserDetails />} />
      <Route path="*" element={<NoPage />} />
    </Routes>
  );
}

export default App;
