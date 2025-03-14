import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./Layout"; // Import Layout with fixed sidebar
import Dashboard from "./Default_Screen/Dashboard";
import Form_elements from "./components/Form_elements";
import User_interaction from "./components/User_interaction";
import Investment from "./components/Investment";
import Marketing from "./components/Marketing";
import News from "./components/News";
import "./App.css";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Use Layout for consistent sidebar */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/dashboard" />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="form-elements" element={<Form_elements />} />
          <Route path="user-interaction" element={<User_interaction />} />
          <Route path="investment" element={<Investment />} />
          <Route path="marketing" element={<Marketing />} />
          <Route path="news" element={<News />} />
        </Route>
      </Routes>
    </Router>
  );
}
