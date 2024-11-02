import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const AllJobs = () => {
  const [jobs, setJobs] = useState([]);

  // Fetch the job list
  useEffect(() => {
    const fetchJobs = async () => {
      const token = Cookies.get("token");
      try {
        const res = await axios.get("http://localhost:3000/api/v1/job/get", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setJobs(res.data.jobs || []);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, []);

  // Handle job deletion
  const handleDelete = async (jobId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this job?"
    );
    if (!confirmDelete) return;

    const token = Cookies.get("token");

    try {
      await axios.get(`http://localhost:3000/api/v1/job/delete/${jobId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Remove the deleted job from the state
      setJobs(jobs.filter((job) => job._id !== jobId));

      alert("Job deleted successfully!");
    } catch (error) {
      console.error("Error deleting job:", error);
      alert("Failed to delete job. Please try again.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">All Jobs</h1>
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4 border">Title</th>
            <th className="py-2 px-4 border">Company</th>
            <th className="py-2 px-4 border">Salary</th>
            <th className="py-2 px-4 border">Location</th>
            <th className="py-2 px-4 border">Experience</th>
            <th className="py-2 px-4 border">Requirements</th>
            <th className="py-2 px-4 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobs.length > 0 ? (
            jobs.map((job) => (
              <tr key={job._id} className="border-t">
                <td className="py-2 px-4 border">{job.title}</td>
                <td className="py-2 px-4 border">{job.company?.name}</td>
                <td className="py-2 px-4 border">{job.salary}</td>
                <td className="py-2 px-4 border">{job.location}</td>
                <td className="py-2 px-4 border">{job.experience}</td>
                <td className="py-2 px-4 border">{job.requirements.join(", ")}</td>
                <td className="py-2 px-4 border">
                  <button
                    onClick={() => handleDelete(job._id)}
                    className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="py-4 text-center text-gray-500">
                No jobs found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AllJobs;
