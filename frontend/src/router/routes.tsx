import { RouteObject, Navigate } from "react-router-dom";
import HomePage from "../pages/HomePage";
import AdminPage from "../pages/AdminPage";
import SignUp from "../components/SignUp";
import LogIn from "../components/LogIn";
import Profile from "../components/Profile"; // Import trang hồ sơ
import StaffManagement from "../components/Admin/StaffManagement";
import PatientManagement from "../components/Admin/PatientManagement";


// Private route component for protecting routes requiring authentication
const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"; // Ensure we are checking for true/false as a string
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  // Check if the user is logged in and has the correct role
  if (isLoggedIn && user?.roles?.[0] === "ADMIN") {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/login",
    element: <LogIn />,
  },  
  {
    path: "/profile", // Route for profile page
    element: <Profile />,
  }, 
  {
    path: "/adminpage", // Route for managing products
    element: (
      <PrivateRoute>
        <AdminPage />
      </PrivateRoute>
    ),
  }, 
  {
    path: "/staff-management", // Route for managing products
    element: (
      <PrivateRoute>
        <StaffManagement />
      </PrivateRoute>
    ),
  }, 
  {
    path: "/patient-management", // Route for managing products
    element: (
      <PrivateRoute>
        <PatientManagement />
      </PrivateRoute>
    ),
  }, 
];
