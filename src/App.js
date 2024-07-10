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
import KanbanBoard from "./Components/Kanban/KanbanBaord";
import PrivateRoute from "./Components/PrivateRoute";
// import ProtectedRoute from "./Components/ProtectedRoute";
import AcceptInvite from "./Components/AcceptInvite";
import WorkSpaceLanding from "./Components/WorkSpaceLanding";
import Comments from "./Components/Kanban/Comments";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
      </Routes>
      <ToastContainer />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/test" element={<KanbanBoard />} />
        <Route path="/comments/:category/:id" element={<Comments />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset_password" element={<ResetPassword />} />

        <Route path="/user" element={<PrivateRoute />}>
          <Route path="home" element={<Home />} />
          <Route path="workspace/:workspace_id" element={<WorkspacePage />} />
          <Route path="accept-invite/:token" element={<AcceptInvite />} />
        </Route>
        {/* <ProtectedRoute path="/accept-invite" component={AcceptInvite} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
