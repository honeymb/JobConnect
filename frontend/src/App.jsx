import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "./components/auth/Signup";
import Home from "./components/Home";
import Login from "./components/auth/Login";
import Admin from "./components/Admin";
import CompanyDetails from "./components/CompanyDetails";
import JobApplications from "./components/JobApplications";
import ResetPassword from "./components/auth/ResetPassword";
import ChangePassword from "./components/auth/ChangePassword";
import React, { useEffect } from "react";
import CompanyList from "./components/CompanyList";
import EditCompany from "./components/EditCompany";
import AddNewCompany from "./components/AddNewCompany";
import AddNewJob from "./components/AddNewJob";
import AllJobs from "./components/AllJobs";

import AdminUserList from "./components/AdminUserList";
import EditUser from "./components/EditUser";
import { Navigate } from "react-router-dom";

import { useNavigate } from "react-router-dom";

const RedirectToCompanies = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/admin/companies"); // Redirect to companies
  }, [navigate]);

  return null; // This component does not render anything
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/admin",
    element: <Admin />,
    children: [
      {
        path: "",
        element: <RedirectToCompanies />,
      },
      {
        path: "company",
        element: <CompanyDetails />,
      },
      {
        path: "applications",
        element: <JobApplications />,
      },
      {
        path: "companies",
        element: <CompanyList />, // View list of companies
      },
      {
        path: "companies/edit/:id",
        element: <EditCompany />, // Edit company details
      },
      {
        path: "companies/add",
        element: <AddNewCompany />, // Add new company
      },
      {
        path: "job/list",
        element: <AllJobs />, // Add new company
      },
      {
        path: "job/add",
        element: <AddNewJob />, // Add new company
      },
      {
        path: "users",
        element: <AdminUserList />, // View list of users
      },
      {
        path: "users/:id/edit",
        element: <EditUser />, // Edit user details
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
  {
    path: "/change-password/:token",
    element: <ChangePassword />,
  },
  // Added new routes for company management
  // recruiter
  {
    path: "/recruiter/companies",
    element: <Companies />,
  },
  {
    path: "/recruiter/companies/create",
    element: <CompanyCreate />,
  },
  {
    path: "/recruiter/companies/:id",
    element: <CompanySetup />,
  },
  {
    path: "/recruiter",
    element: <RecruiterJobs />,
  },
  {
    path: "/recruiter/jobs/create",
    element: <PostJob />,
  },
]);

function App() {
  return <RouterProvider router={appRouter} />;
}

export default App;
