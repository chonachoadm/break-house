import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";

import Layout from "../components/Layout";
import Home from "../pages/Home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Videos from "../pages/videos/Videos";
import VideoDetail from "../pages/videos/VideoDetail";
import CreateVideo from "../pages/videos/CreateVideo";
import EditVideo from "../pages/videos/EditVideo";
import Users from "../pages/users/Users";
import UserDetail from "../pages/users/UserDetail";
import CreateUser from "../pages/users/CreateUser";
import EditUser from "../pages/users/EditUser";
import CreateSection from "../pages/sections/CreateSection";
import EditSection from "../pages/sections/EditSection";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <ProtectedRoute element={<Home />} role={0} />,
      },
      {
        path: "/videos",
        element: <ProtectedRoute element={<Videos />} role={0} />
      },          
      {
        path: "/videos/new",
        element: <ProtectedRoute element={<CreateVideo />} role={1} />
      },          
      {
        path: "/videos/:id",
        element: <ProtectedRoute element={<VideoDetail />} role={0} />
      },
      {
        path: "/videos/:id/edit",
        element: <ProtectedRoute element={<EditVideo />} role={1} />
      },
      {
        path: "/users",
        element: <ProtectedRoute element={<Users />} role={0} />
      },          
      {
        path: "/users/new",
        element: <ProtectedRoute element={<CreateUser />} role={1} />
      },          
      {
        path: "/users/:id",
        element: <ProtectedRoute element={<UserDetail />} role={1} />
      },
      {
        path: "/users/:id/edit",
        element: <ProtectedRoute element={<EditUser />} role={1} />
      },
      {
        path: "/sections/new",
        element: <ProtectedRoute element={<CreateSection />} role={1} />
      },
      {
        path: "/sections/:id/edit",
        element: <ProtectedRoute element={<EditSection />} role={1} />
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/register",
        element: <Register />
      },
      {
        path: "*",
        element: <div>404</div>
      }
    ]
  }
]);

export default router