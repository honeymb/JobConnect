import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";


const CompanyList = () => {
  const [companies, setCompanies] = useState([]);

  // Fetch the company list
  useEffect(() => {
    const token = Cookies.get("token"); // Get the token from the cookie

    axios.get("http://localhost:3000/api/v1/company/get",
    {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      }).then((response) => {
        console.log(response.data);
        // alert("Company details updated!");
      setCompanies(response.data.companies);
    });
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Companies</h1>
        <Link to="/admin/companies/add">
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded">
            Add New Company
          </button>
        </Link>
      </div>

      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4 border">Name</th>
            <th className="py-2 px-4 border">Description</th>
            <th className="py-2 px-4 border">Website</th>
            <th className="py-2 px-4 border">Location</th>
            <th className="py-2 px-4 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {companies.length > 0 ? (
            companies.map((company) => (
              <tr key={company._id} className="border-t">
                <td className="py-2 px-4 border">{company.name}</td>
                <td className="py-2 px-4 border">{company.description}</td>
                <td className="py-2 px-4 border">
                  <a
                    href={company.website}
                    className="text-blue-500"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {company.website}
                  </a>
                </td>
                <td className="py-2 px-4 border">{company.location}</td>
                <td className="py-2 px-4 border">
                  <Link to={`edit/${company._id}`}>
                    
                    <button className="bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-2 rounded">
                      Edit
                    </button>
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="py-4 text-center text-gray-500">
                No companies found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CompanyList;
