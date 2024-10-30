import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const AddNewJob = () => {
  const navigate = useNavigate();
  const [job, setJob] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: "",
    companyId: "",
  });
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    // Fetch companies to list them in the dropdown
    const fetchCompanies = async () => {
      const token = Cookies.get("token");
      try {
        const res = await axios.get("http://localhost:3000/api/v1/company/get", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCompanies(res.data.companies || []);
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    };

    fetchCompanies();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setJob((prevJob) => ({
      ...prevJob,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    const token = Cookies.get("token");
    try {
      await axios.post(
        "http://localhost:3000/api/v1/job/post",
        { ...job, requirements: job.requirements }, // Split requirements by comma
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("New job added!");
      navigate("/admin/job/list");
    } catch (error) {
      console.error("Error adding job:", error);
      alert("Failed to add job. Please check your input and try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full">
        <h2 className="text-2xl font-semibold text-center mb-6">Add New Job</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Job Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              value={job.title}
              onChange={handleInputChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
              placeholder="Enter job title"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              id="description"
              value={job.description}
              onChange={handleInputChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
              placeholder="Enter job description"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="requirements" className="block text-sm font-medium text-gray-700">
              Requirements (comma separated)
            </label>
            <input
              type="text"
              name="requirements"
              id="requirements"
              value={job.requirements}
              onChange={handleInputChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
              placeholder="Enter job requirements"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="salary" className="block text-sm font-medium text-gray-700">
              Salary
            </label>
            <input
              type="number"
              name="salary"
              id="salary"
              value={job.salary}
              onChange={handleInputChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
              placeholder="Enter job salary"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">
              Location
            </label>
            <input
              type="text"
              name="location"
              id="location"
              value={job.location}
              onChange={handleInputChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
              placeholder="Enter job location"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="jobType" className="block text-sm font-medium text-gray-700">
              Job Type
            </label>
            <input
              type="text"
              name="jobType"
              id="jobType"
              value={job.jobType}
              onChange={handleInputChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
              placeholder="Enter job type (e.g. Full-time, Part-time)"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="experience" className="block text-sm font-medium text-gray-700">
              Experience Level
            </label>
            <input
              type="number"
              name="experience"
              id="experience"
              value={job.experience}
              onChange={handleInputChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
              placeholder="Enter experience level"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="position" className="block text-sm font-medium text-gray-700">
              Position
            </label>
            <input
              type="number"
              name="position"
              id="position"
              value={job.position}
              onChange={handleInputChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
              placeholder="Enter job position"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="companyId" className="block text-sm font-medium text-gray-700">
              Company
            </label>
            <select
              name="companyId"
              id="companyId"
              value={job.companyId}
              onChange={handleInputChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
            >
              <option value="">Select Company</option>
              {companies.map((company) => (
                <option key={company._id} value={company._id}>
                  {company.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-center">
            <button
              type="button"
              onClick={handleSave}
              className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewJob;
