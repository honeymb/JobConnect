import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react"; // Assuming you are using this for an icon
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import backgroundImage from '../assets/home-bg.jpg'; // Import  background image

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [typing, setTyping] = useState(""); // Initialize with the first letter

  const typingText = "Connecting Talent with Opportunity!";

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  // Typing effect logic
  useEffect(() => {
    let index = 0, typingTimeout; // Start from the second character
    const typeCharacter = () => {
      if (index < typingText.length) {
        let textChar = typingText.slice(index, index + 1);
        if (!textChar) {
          clearTimeout(typingTimeout);
          return;
        }
        // Update typing state with the next character
        setTyping((prev) => (prev + textChar));
        index += 1;
        // Schedule the next character to be typed
        setTimeout(typeCharacter, 100); // Call the function again after 100ms
      } else {
        clearTimeout(typingTimeout);
      }
    };
    // Start typing when the component mounts
    typingTimeout = setTimeout(typeCharacter, 100);
    return () => clearTimeout(typingTimeout); // Cleanup on unmount
  }, []); // Empty dependency array to run only on mount

  return (
    <div
      className="flex flex-col items-center justify-center min-h-[70vh] bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="bg-black bg-opacity-80 p-8 rounded-lg shadow-lg text-center">
        <span className="block mx-auto px-4 py-2 rounded-full bg-[#005477] text-white font-semibold text-lg">
          {typing}
        </span>
        <h1 className="mt-4 text-5xl font-bold text-white">
          Search, Apply & <br /> Get Your{" "}
          <span className="text-[#00BFFF]">Dream Jobs</span>
        </h1>

        <div className="flex justify-center mt-6">
          <input
            type="text"
            className="px-4 py-2 rounded-l-full w-96"
            placeholder="Search for jobs..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Button
            onClick={searchJobHandler}
            className="flex items-center px-4 py-2 bg-[#005477] text-white rounded-r-full hover:bg-[#004B6D] transition duration-300"
          >
            <Search className="mr-2" />
            Search
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
