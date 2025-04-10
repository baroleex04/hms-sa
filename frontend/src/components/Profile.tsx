import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Profile: React.FC = () => {
  const [user, setUser] = useState<{
    id: string;
    name: string;
    username: string;
    old_password: string;
    password: string;
    confirm_password: string;
    roles: string[];
  } | null>(null);

  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {

    // Fetch user data from localStorage (update this if using API)
    const storedUser = JSON.parse(localStorage.getItem("user") || "null");
    if (storedUser) {
      setUser(storedUser);
      
      // Kiểm tra vai trò ADMIN
      const userData = localStorage.getItem("user");
      if (userData) {
        const user = JSON.parse(userData);
        if (user.roles && user.roles[0] === "ADMIN") {
          setIsAdmin(true);
        }
      }
    } else {
      navigate("/login"); // Redirect if not logged in
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user"); // Remove user data
    localStorage.removeItem("checkoutInfo");
    
    navigate("/login");
    window.location.reload();
    window.scrollTo(0, 0);
  };

  const handleUpdateProfile = async () => {
    if (!user) {
      toast.error("Profile data is missing!");
      return;
    }
  
    const { id, name, username, old_password, password, confirm_password } = user;
  
    // Kiểm tra nếu có trường nào rỗng
    if (!name || !username) {
      toast.error("One or more fields are empty.");
      return;
    }

    if (old_password !== "" && old_password) {
      console.log("check", password)
      if (password == "" || !password){
        toast.error("Please fill in all password fields.");
        return;
      }  
    }

    if (password !== confirm_password) {
      toast.error("New password and confirmation do not match.");
      return;
    }
    
    try {
      const response = await fetch("http://127.0.0.1:5000/user/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, name, username, old_password, password }),
      });

      const result = await response.json();
  
      if (!response.ok) {
        // Nếu server trả về lỗi logic (dù HTTP 200)
        if (result.error === "Old password is incorrect.") {
          toast.error("Old password is incorrect.");
          return;
        }
        if (result.error === "User not found or no changes made.") {
          toast.error("No changes made. Update failed!");
          return;
        }
      }

      toast.success("Profile updated successfully!", { autoClose: 1500 });

      // Lấy user hiện tại từ localStorage
      const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
      
      // Cập nhật chỉ các trường cần thay đổi
      const updatedUser = {
        ...storedUser, // Giữ nguyên các dữ liệu khác
        name: name,
        username: username,
      };
      
      // Lưu lại dữ liệu mới vào localStorage
      localStorage.setItem("user", JSON.stringify(updatedUser));

      // Cập nhật state
      setUser(updatedUser);
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("An unexpected error occurred.");
    }
  };
  
  return (
    <div className="container mx-auto py-12">
    <div className="flex items-center justify-center">    
      {/* Profile Form */}
      <div className="w-full h-full p-8 bg-white shadow-lg rounded-l md:w-[600px] md:h-auto">
        <h2 className="text-[20px] font-medium text-red-500 mb-6">Edit Your Profile</h2>
        
        <div className="grid grid-cols-1 gap-4">
        {/* First Name */}
          <div>
            <label className="block text-[16px] mb-1">Full Name<a className="text-red-500">*</a></label>
            <input
              type="text"
              value={user?.name || ""}
              onChange={(e) => setUser((prev) => prev ? { ...prev, name: e.target.value } : null)}
              className="w-full p-2 border border-gray-300 rounded bg-white text-[16px] text-gray-600 mb-4 md:mb-0"
            />
          </div>        

          {/* Email */}
          <div>
            <label className="flex items-center text-[16px] mb-1">
              Email
            </label>
            <input
              type="email"
              value={user?.username || ""}
              onChange={(e) => setUser((prev) => prev ? { ...prev, username: e.target.value } : null)}
              className="w-full p-2 border border-gray-300 rounded bg-white text-[16px] text-gray-600 mb-4 md:mb-0"
            />
          </div>
          
        </div>

        {/* Password Fields */}
        <h3 className="text-[16px] mt-6 mb-4">Password Changes</h3>
        <div className="grid grid-cols-1 gap-4">
          <input
            type="text"
            placeholder="Current Password"
            value={user?.old_password || ""}
            onChange={(e) => setUser((prev) => prev ? { ...prev, old_password: e.target.value } : null)}
            className="w-full p-2 border border-gray-300 rounded bg-white text-[16px] placeholder:text-gray-600"
          />
          <input
            type="text"
            placeholder="New Password"
            value={user?.password || ""}
            onChange={(e) => setUser((prev) => prev ? { ...prev, password: e.target.value } : null)}
            className="w-full p-2 border border-gray-300 rounded bg-white text-[16px] placeholder:text-gray-600"
          />
          <input
            type="text"
            placeholder="Confirm New Password"
            value={user?.confirm_password || ""}
            onChange={(e) => setUser((prev) => prev ? { ...prev, confirm_password: e.target.value } : null)}
            className="w-full p-2 border border-gray-300 rounded bg-white text-[16px] placeholder:text-gray-600"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end mt-6 space-x-4">
          <button
            onClick={() => {
              const storedUser = JSON.parse(localStorage.getItem("user") || "null");
              if (storedUser) {
                setUser(storedUser);
              }
            }}
            className="px-4 py-2 text-black text-[16px]"
          >
            Cancel
          </button>

          <button onClick={handleUpdateProfile} className="px-6 py-2 bg-red-500 text-white rounded-lg text-[16px]">
            Save Changes
          </button>
        </div>
       
      </div>
    </div>
    </div>

  );
};

export default Profile;