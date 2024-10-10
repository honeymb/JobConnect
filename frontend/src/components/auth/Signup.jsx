import React, { useCallback, useEffect, useState } from "react";
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
import { setLoading } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";
import signupImage from "@/assets/signup.jpg"; // Image reference from: https://www.pexels.com
import { Upload } from "lucide-react"; // Import the upload icon
import ReactPasswordChecklist from "react-password-checklist";

const INPUT_FIELDS = {
  fullname: "",
  email: "",
  phoneNumber: "",
  password: "",
  confirmPassword: "",
  role: "",
  file: "",
};

const PWD_RULES = ["minLength", "specialChar", "number", "capital", "match"];
const CLASS_NAME = "text-black rounded-[4px] border border-gray-300 p-2 w-full transition duration-200 focus:outline-none focus:ring focus:ring-blue-500"
const debounce = (cb, time) => {
  let timer;
  return (...args) => {
    if (timer) clearTimeout(timer);  // Clear any previously set timer
    timer = setTimeout(() => {
      cb(...args);  // Only call the callback after the delay
    }, time);
  };
};

const Signup = () => {
  const [input, setInput] = useState(INPUT_FIELDS);
  const { loading, user } = useSelector((store) => store.auth);
  const [isFormValid, setIsFormValid] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) { navigate("/"); }
  }, [user, navigate]);

  useEffect(() => {
    if (input.password || input.confirmPassword) {
      setIsFormValid(input.confirmPassword === input.password);
      debouncedToastFn(input.password, input.confirmPassword); // Trigger debounced function only when input changes
    }
    return () => toast.dismiss();
  }, [input.password, input.confirmPassword]);

  // Debounced toast function to show password checklist after delay
  const debouncedToastFn = useCallback(debounce((pwd, confirmPwd) => {
    toast(
      <ReactPasswordChecklist
        rules={PWD_RULES}
        minLength={5}
        value={pwd}
        valueAgain={confirmPwd}
        onChange={onPasswordCheckerChange}
      />,
      {
        dismissible: true,
        duration: Infinity,
        onDismiss: () => toast.dismiss(),
      }
    )
  }, 500), []);

  const changeEventHandler = (e) => {
    setInput((prevInput) => ({ ...prevInput, [e.target.name]: e.target.value }));
  };

  const changeFileHandler = (e) => {
    setInput((prevInput) => ({ ...prevInput, file: e.target.files?.[0] }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    if (input.file) {
      formData.append("file", input.file);
    }
    const entries = Object.fromEntries(formData);

    try {
      dispatch(setLoading(true));
      if (input.password !== input.confirmPassword) {
        throw new Error("Password does not match. Please try again!");
      }
      const res = await axios.post(`${USER_API_END_POINT}/register`, entries, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        toast.error(error?.response?.data?.message);
      } else {
        toast.error(error?.message);
      }
    } finally {
      dispatch(setLoading(false));
    }
  };

  const onPasswordCheckerChange = (value) => {
    setIsFormValid(value);
  }

  return (
    <div
      className="relative min-h-screen flex flex-col"
      style={{
        backgroundImage: `url(${signupImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex flex-col flex-1">
        <Navbar />
        <div className="flex justify-center items-center flex-1">
          <form
            onSubmit={submitHandler}
            className="relative w-full max-w-md my-10 p-8 text-white bg-[#005477] bg-opacity-95 shadow-lg rounded-lg z-10"
          >
            <h1 className="font-bold text-2xl mb-6 text-center">Sign Up</h1>
            <div className="my-4">
              <Label>Full Name</Label>
              <Input
                type="text"
                value={input.fullname}
                name="fullname"
                onChange={changeEventHandler}
                placeholder="Full Name"
                className={CLASS_NAME}
              />
            </div>
            <div className="my-4">
              <Label>Email</Label>
              <Input
                type="email"
                value={input.email}
                name="email"
                onChange={changeEventHandler}
                placeholder="test@gmail.com"
                className={CLASS_NAME}
              />
            </div>
            <div className="my-4">
              <Label>Phone Number</Label>
              <Input
                type="text"
                value={input.phoneNumber}
                name="phoneNumber"
                onChange={changeEventHandler}
                placeholder="8080808080"
                className={CLASS_NAME}
              />
            </div>
            <div className="my-4">
              <Label>Password</Label>
              <Input
                type="password"
                value={input.password}
                name="password"
                onChange={changeEventHandler}
                placeholder="Enter Password"
                className={CLASS_NAME}
              />
            </div>
            <div className="my-4">
              <Label>Retype Password</Label>
              <Input
                type="password"
                value={input.confirmPassword}
                name="confirmPassword"
                onChange={changeEventHandler}
                placeholder="Confirm Password"
                className={CLASS_NAME}
              />
            </div>
            <div className="my-4">
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
                  <Label htmlFor="jobseeker" className="text-sm">Job Seeker</Label>
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
                  <Label htmlFor="recruiter" className="text-sm">Recruiter</Label>
                </div>
              </RadioGroup>
            </div>
            <div className="flex items-center gap-2 mt-4">
              <Label className="flex items-center">
                <Upload className="h-5 w-5 mr-2 cursor-pointer" />
                <span>{input.file ? input.file.name : "Upload Profile Picture"}</span>
                <Input
                  accept="image/*"
                  type="file"
                  onChange={changeFileHandler}
                  className="hidden"
                  name="file"
                />
              </Label>
            </div>
            {loading ? (
              <Button className="w-full my-4 bg-gradient-to-r from-black to-teal-500 hover:opacity-90 transition duration-500">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
              </Button>
            ) : (
              <Button
                type="submit"
                disabled={isFormValid ? false : true}
                className="w-full my-4 bg-black hover:bg-black-800 transition duration-200"
              >
                Signup
              </Button>
            )}
            <span className="text-sm text-center">
              Already have an account?{" "}
              <Link to="/login" className="text-[#44c8ff] font-semibold hover:underline">
                Login
              </Link>
            </span>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
