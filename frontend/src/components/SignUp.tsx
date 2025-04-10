import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid"; // Import UUID to generate unique user IDs

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  // Password validation state
  const [passwordValidation, setPasswordValidation] = useState({
    hasMinLength: false,
    hasLowerCase: false,
    hasUpperCase: false,
    hasDigit: false,
    isValid: false,
  });
  const [showPasswordRequirements, setShowPasswordRequirements] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  
  // Check password on every change
  useEffect(() => {
    const password = formData.password;
    
    const hasMinLength = password.length >= 8;
    const hasLowerCase = /[a-z]/.test(password);
    const hasUpperCase = /[A-Z]/.test(password);
    const hasDigit = /\d/.test(password);
    const isValid = hasMinLength && hasLowerCase && hasUpperCase && hasDigit;
    
    setPasswordValidation({
      hasMinLength,
      hasLowerCase,
      hasUpperCase,
      hasDigit,
      isValid
    });
  }, [formData.password]);

  const validatePassword = (password: string): boolean => {
    return passwordValidation.isValid;
  };

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Function to call the API to register a user
  const registerUser = async (formData: { email: string; password: string; firstname: string; lastname: string }) => {
    console.log("Attempting to register with password:", formData.password);
    
    if (!validatePassword(formData.password)) {
      toast.error("Password must be 8+ characters with an uppercase, lowercase, and number.", {
        position: "top-right",
        autoClose: 3000, // Closes after 3 seconds
      });
      return Promise.reject(new Error("Invalid password format"));
    }
    
    // Generate a unique user ID with UUID
    const userId = `U${uuidv4().substring(0, 6)}`;
    
    // Format data for backend API
    const userData = {
      id: userId,
      username: formData.email, // Using email as username
      password: formData.password,
      name: `${formData.firstname} ${formData.lastname}`, // Combining first and last name
    };
        
    try {
      // Call the backend API to create a user with more detailed error logging
      const response = await axios.post(
        "http://127.0.0.1:5000/user/add",
        userData,
        {
          method: "POST", // Explicit but optional with axios.post
          headers: {
            "Content-Type": "application/json",
          },
          timeout: 10000,
        }
      );
      
      // Return the response data
      return {
        ...response.data,
        email: formData.email,
        name: userData.name
      };
    } catch (error: any) {
      console.error("API error details:", {
        message: error.message,
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data
      });
      
      // Handle specific error cases with more detail
      if (error.response?.status === 500 && error.response.data?.error?.includes("Duplicate entry")) {
        return Promise.reject(new Error("Email already exists"));
      } else if (error.response?.status === 500) {
        return Promise.reject(new Error(`Server error: ${error.response.data?.error || "Unknown error"}`));
      } else if (error.message.includes("timeout")) {
        return Promise.reject(new Error("Connection timeout. Server might be unavailable."));
      } else if (error.message.includes("Network Error")) {
        return Promise.reject(new Error("Network error. Check your connection or server status."));
      } 
      return Promise.reject(error); // Pass other errors to useMutation
    }
  };

  // Use the useMutation hook for API calls
  const { mutate, isPending, error } = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      toast.success("Account created successfully!", { autoClose: 1500 });
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    },
    onError: (error: any) => {
      if (error.message === "Invalid password format") {
        // Already handled in registerUser
      } else if (error.message === "Email already exists") {
        toast.error("Email is already in use!");
      } else if (error.message.includes("Server error")) {
        toast.error(error.message);
        console.error("Server error:", error);
      } else if (error.message.includes("Connection timeout") || error.message.includes("Network error")) {
        toast.error(error.message);
        console.error("Connection error:", error);
      } else {
        toast.error(`Registration failed: ${error.message || "Unknown error"}`);
        console.error("Registration error full details:", error);
      }
    },
  });

  const handleSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.email || !formData.password || !formData.firstname || !formData.lastname) {
      toast.error("One or more fields are empty!");
      return;
    }
    mutate(formData);
  };

  return (
    <div className="flex h-[500px] md:h-[600px] justify-center mt-10 md:mt-20 bg-white">
      <div className="flex bg-white overflow-hidden w-[1000px] h-[500px]">
        <div className="w-1/2 hidden md:block rounded">
          <img src="/hospitalCRM.svg" alt="Sign Up" className="w-full h-full object-cover rounded" />
        </div>
        <div className="w-full md:w-1/2 p-2 md:p-8 lg:p-12">
          <h2 className="text-[36px] mb-1 font-[Inter]">Create an account</h2>
          <p className="mb-8 text-gray-600 text-[16px]">Enter your details below</p>

          <form onSubmit={handleSignUp}>
            <div className="flex gap-4 mb-4">
              <input
              type="text"
              name="firstname"
              placeholder="First Name"
              value={formData.firstname}
              onChange={handleChange}
              className="w-1/2 border-b border-gray-400 text-gray-600 text-[16px] outline-none"
              />
              <input
              type="text"
              name="lastname"
              placeholder="Last Name"
              value={formData.lastname}
              onChange={handleChange}
              className="w-1/2 border-b border-gray-400 text-gray-600 text-[16px] outline-none"
              />
            </div>           
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full mb-4 border-b border-gray-400 text-gray-600 text-[16px] outline-none"
            />

            <div className="relative mb-1">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                onFocus={() => setShowPasswordRequirements(true)}
                className="w-full mb-4 border-b border-gray-400 text-gray-600 text-[16px] outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/4 transform -translate-y-1/2 text-gray-500"
              >
                {showPassword ? (
                  <img src="/ShowPass.svg" alt="Show Password" className="w-[20px] h-[20px] cursor-pointer" />
                ) : (
                  <img src="/hide.png" alt="Hide Password" className="w-[20px] h-[20px] cursor-pointer" />
                )}
              </button>
            </div>

            {/* Password requirements checklist */}
            {showPasswordRequirements && (
              <div className="mb-4 text-sm text-gray-600">
                <p className="font-semibold">Password must have:</p>
                <ul className="pl-5 list-disc">
                  <li className={passwordValidation.hasMinLength ? "text-green-500" : "text-red-500"}>
                    Minimum 8 characters
                  </li>
                  <li className={passwordValidation.hasLowerCase ? "text-green-500" : "text-red-500"}>
                    At least one lowercase letter (a-z)
                  </li>
                  <li className={passwordValidation.hasUpperCase ? "text-green-500" : "text-red-500"}>
                    At least one uppercase letter (A-Z)
                  </li>
                  <li className={passwordValidation.hasDigit ? "text-green-500" : "text-red-500"}>
                    At least one number (0-9)
                  </li>
                </ul>
              </div>
            )}

            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-red-500 text-white py-2 rounded text-[16px]"
            >
              {isPending ? "Creating..." : "Create Account"}
            </button>
          </form>

          <button className="flex items-center justify-center w-full h-[56px] mt-4 border border-black/40 rounded-[4px]">
            <img src="/Google.svg" alt="Google" className="w-[24px] h-[24px]" />
            <span className="ml-4 text-[16px]">Sign up with Google</span>
          </button>

          <p className="mt-4 text-center text-gray-700">
            Already have an account?
            <a href="/login" className="text-black ml-4 hover:border-b-2 hover:border-black">
              Log in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
