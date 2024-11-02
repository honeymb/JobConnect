import { setAllRecruiterJobs } from "@/redux/jobSlice";
import { JOB_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAllRecruiterJobs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllRecruiterJobs = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/getrecruiterjobs`, {
          withCredentials: true, // Ensures credentials are sent with the request
        });

        if (res.data.success) {
          // Dispatch the recruiter jobs to Redux store
          dispatch(setAllRecruiterJobs(res.data.jobs));
        } else {
          // Handle any failure scenarios if the API responds but `success` is false
          console.error("Failed to fetch recruiter jobs:", res.data.message);
        }
      } catch (error) {
        // Handle the error properly
        console.error("Error fetching recruiter jobs:", error.message || error);
      }
    };

    // Call the async function to fetch jobs
    fetchAllRecruiterJobs();

    // Added dispatch as a dependency
  }, [dispatch]);
};

export default useGetAllRecruiterJobs;
