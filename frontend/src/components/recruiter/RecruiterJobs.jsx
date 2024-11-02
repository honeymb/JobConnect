import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import RecruiterJobsTable from "./RecruiterJobsTable";
import { setAllRecruiterJobs } from "@/redux/jobSlice";
import { setSearchJobByText } from "@/redux/jobSlice";

const RecruiterJobs = () => {
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch recruiter jobs
    const fetchRecruiterJobs = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/v1/job/get");
        if (data.jobs) {
          // Dispatch to store the recruiter jobs in Redux
          dispatch(setAllRecruiterJobs(data));
        }
      } catch (error) {
        console.error("Error fetching recruiter jobs", error);
      }
    };

    fetchRecruiterJobs();
  }, [dispatch]);

  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input, dispatch]);

  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto my-10">
        <div className="flex items-center justify-between my-5">
          <Input
            className="w-fit"
            placeholder="Filter by name, role"
            onChange={(e) => setInput(e.target.value)}
          />
          <Button onClick={() => navigate("/recruiter/jobs/create")}>
            New Jobs
          </Button>
        </div>
        <RecruiterJobsTable />
      </div>
    </div>
  );
};

export default RecruiterJobs;
