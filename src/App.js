import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import ResetPassword from "./Pages/ResetPassword";
import Home from "./Pages/Home";
import WorkspacePage from "./Pages/Workspace";
import LandingPage from "./Pages/LandingPage";

import PrivateRoute from "./Components/PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
      </Routes>
      <ToastContainer />
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />
        <Route path="/reset_password" element={<ResetPassword />} />

        <Route path="/user" element={<PrivateRoute />}>
          <Route path="home" element={<Home />} />
          <Route path="workspace/:workspace_id" element={<WorkspacePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
