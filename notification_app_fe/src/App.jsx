import { Box } from "@mui/material";
import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import AllNotifications from "./pages/AllNotifications.jsx";
import PriorityNotifications from "./pages/PriorityNotifications.jsx";

function App() {
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/notifications" replace />} />
        <Route path="/notifications" element={<AllNotifications />} />
        <Route path="/priority" element={<PriorityNotifications />} />
      </Routes>
    </Box>
  );
}

export default App;
