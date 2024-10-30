import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";
import loginImage from "@/assets/login.jpg"; //Image reference from : https://www.pexels.com
const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });
  const { loading, user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    let inputData = { ...input };
    if (input.email === 'admin.jobconnect@yopmail.com') {
      setInput((prevInputData) => ({ ...prevInputData, role: 'admin' }));
      inputData = { ...inputData, role: 'admin' }
    }
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/login`, inputData, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        console.log(res.data.user.role);
        const userRole = res.data.user.role;
        if (userRole === "admin") {
          navigate("/admin/companies");
        } else {
          navigate("/");
        }
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) {
      if (user.role === "admin") {
        navigate("/admin/companies");
      } else {
      navigate("/");
      }
    }
  }, [user, navigate]);

  return (
    <div
      className="relative min-h-screen flex flex-col"
      style={{
        backgroundImage: `url(${loginImage})`, // Use the login image as the background
        backgroundSize: "cover", // Ensures the background covers the entire container
        backgroundPosition: "center", // Centers the image
        backgroundRepeat: "no-repeat", // Prevents image from repeating
        backgroundAttachment: "fixed", // Keeps the background fixed during scroll
      }}
    >
      <div className="flex flex-col flex-1">
        <Navbar />
        <div className="flex justify-center items-center flex-1">
          <form
            onSubmit={submitHandler}
            className="relative w-full max-w-md my-10 p-8 text-white bg-[#005477] bg-opacity-90 shadow-lg rounded-lg z-10"
          >
            <h1 className="font-bold text-2xl mb-6 text-center">Login</h1>
            <div className="my-4">
              <Label>Email</Label>
              <Input
                type="email"
                value={input.email}
                name="email"
                onChange={changeEventHandler}
                placeholder="test@gmail.com"
                className="text-black rounded-md border border-gray-300 p-2 w-full transition duration-200 focus:outline-none focus:ring focus:ring-blue-500"
              />
            </div>

            <div className="my-4">
              <Label>Password</Label>
              <Input
                type="password"
                value={input.password}
                name="password"
                onChange={changeEventHandler}
                placeholder="Password"
                className="text-black rounded-md border border-gray-300 p-2 w-full transition duration-200 focus:outline-none focus:ring focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center justify-between my-4">
              <RadioGroup className="flex items-center gap-4">
                <div className="flex items-center space-x-2">
                  <Input
                    id="jobseeker"
                    type="radio"
                    name="role"
                    value="jobseeker"
                    checked={input.role === "jobseeker"}
                    onChange={changeEventHandler}
                    className="cursor-pointer h-4 w-4"
                  />
                  <Label htmlFor="jobseeker">Job Seeker</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Input
                    id="recruiter"
                    type="radio"
                    name="role"
                    value="recruiter"
                    checked={input.role === "recruiter"}
                    onChange={changeEventHandler}
                    className="cursor-pointer h-4 w-4"
                  />
                  <Label htmlFor="recruiter">Recruiter</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Input
                    id="admin"
                    type="radio"
                    name="role"
                    value="admin"
                    checked={input.role === "admin"}
                    onChange={changeEventHandler}
                    className="cursor-pointer h-4 w-4"
                  />
                  <Label htmlFor="admin">Admin</Label>
                </div>
              </RadioGroup>
            </div>

            {loading ? (
              <Button className="w-full my-4 bg-gradient-to-r from-black to-teal-500 hover:opacity-90 transition duration-500">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
              </Button>
            ) : (
              <Button type="submit" className="w-full my-4 bg-black hover:bg-black-700 transition duration-200">
                Login
              </Button>
            )}

            {/* Aligning the account and password recovery links */}
            <div className="text-sm text-center">
              <div>
                Don't have an account?{" "}
                <Link to="/signup" className="text-[#44c8ff] font-semibold hover:underline">
                  Signup
                </Link>
              </div>
              <div>
                Forgot Your Password?{" "}
                <Link to="/reset-password" className="text-[#44c8ff] font-semibold hover:underline">
                  Reset Password
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
