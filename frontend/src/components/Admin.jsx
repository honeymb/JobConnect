import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import Navbar from "./shared/Navbar";
import Footer from "./shared/Footer";
import "./Admin.css"; // Add custom styles

const Admin = () => {
  return (
    <div className="admin-layout">
      <Navbar /> {/* Add Navbar at the top */}
      <div className="admin-container">
        <nav className="sidebar">
          <ul>
            {/* <li>
              <NavLink to="applications" activeClassName="active-link">
                Job Applications
              </NavLink>
            </li> */}
            <li>
              <NavLink to="job/add" activeClassName="active-link">
                Add New Job
              </NavLink>
            </li>
            <li>
              <NavLink to="job/list" activeClassName="active-link">
                List Jobs
              </NavLink>
            </li>
            <li>
              <NavLink to="companies" activeClassName="active-link">
                Company List
              </NavLink>
            </li>
            <li>
              <NavLink to="companies/add" activeClassName="active-link">
                Add New Company
              </NavLink>
            </li>
            <li>
              <NavLink to="users" activeClassName="active-link">
                List Users
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className="content-container">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Admin;
