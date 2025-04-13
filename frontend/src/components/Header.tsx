import React, { useState, useRef, useEffect } from "react";

const Header: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  let timeoutId: NodeJS.Timeout;

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user"); // Remove user data
    window.location.href = "/login"; // Redirect to login
    window.location.reload();
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    // Check login status
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);

    // Check if user is admin
    const userData = localStorage.getItem("user");
    if (userData) {
      const user = JSON.parse(userData);
      if (user.roles && user.roles[0] === "ADMIN") {
        setIsAdmin(true);
      }
    }
  }, []);

  return (
    <header className="w-full border-b top-0 left-0 bg-white z-50">
      {/* Banner */}
      <div className="bg-black text-white flex justify-between items-center py-2 px-8 text-sm h-12 gap-x-16">
        <span className="font-[Poppins] text-[14px] flex-1 text-center text-gray-300">
          Welcome to Hospital Management System
        </span>
      </div>

      {/* Navigation bar */}
      <nav className="flex items-center justify-between max-w-7xl mx-auto p-4">
        <h1 className="text-[24px] font-bold">HMS</h1>

        {/* Menu items */}
        <div className="text-[16px] space-x-4 sm:space-x-8 md:space-x-12  ">
          <a
            href={isLoggedIn ? "/adminpage" : "/"}
            className="hover:border-b-2 hover:border-black"
          >
            {isLoggedIn ? "Dashboard" : "Home"}
          </a>
          {isLoggedIn && (
            <a href="/patient-management" className="hover:border-b-2 hover:border-black">Patients</a>
          )}         
          {isLoggedIn && (
            <a href="/staff-management" className="hover:border-b-2 hover:border-black">Staff</a>
          )}   
          {isLoggedIn && (
            <a href="/profile" className="hover:border-b-2 hover:border-black">Account</a>
          )}         
          {!isLoggedIn && (
            <a href="#" className="hover:border-b-2 hover:border-black">Contact</a>
          )}        
          {!isLoggedIn && (
            <a href="/login" className="hover:border-b-2 hover:border-black">Login</a>
          )}
          {!isLoggedIn && (
            <a href="/signup" className="hover:border-b-2 hover:border-black">Sign Up</a>
          )}
        </div>

        {/* User Profile */}
        <div className="flex items-center space-x-4 relative">
          <div className="relative inline-block"
            onMouseEnter={() => {
              clearTimeout(timeoutId);
              setIsOpen(true);
            }}
            onMouseLeave={() => {
              timeoutId = setTimeout(() => setIsOpen(false), 200); // Delay closing
            }}
          >
            <a href={isLoggedIn ? "/profile" : "/login"} className="flex items-center">
              <img
                src={isLoggedIn ? "/userlogged.svg" : "/user.svg"}
                alt="User"
                className="w-[32px] h-[32px] cursor-pointer"
              />
            </a>
            {isLoggedIn && isOpen && (
              <div 
                className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2 border z-50"
                style={{ position: "absolute", top: "100%", left: "50%", transform: "translateX(-50%)", minWidth: "200px" }}
              >
                <a href="/profile" className="block px-4 py-2 hover:bg-gray-100">
                  My Profile
                </a>               
                <a href="/login" onClick={handleLogout} className="block px-4 py-2 hover:bg-gray-100">
                  Log Out
                </a>
              </div>
            )}
          </div>
        </div>
      </nav>     
    </header>
  );
};

export default Header;
