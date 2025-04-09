import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white py-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-5 gap-8">
        {/* Hospital Information */}
        <div>
          <h2 className="text-[24px] font-semibold">HMS</h2>
          <p className="mt-3 text-[16px] text-gray-300">Experience top healthcare anytime, anywhere.</p>
          <div className="hidden lg:flex items-center mt-3 border border-white rounded px-3 py-2 relative w-full max-w-[300px]">
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-transparent outline-none flex-1 text-sm pr-10" 
            />
            <button className="text-white absolute right-3 top-1/2 -translate-y-1/2">
              ➤
            </button>
          </div>
        </div>

        {/* Support */}
        <div className="space-y-4">
          <h2 className="text-[20px]">Support</h2>
          <p className="mt-3 text-[16px] text-gray-300">123 Health St., City Center, Medical Zone</p>
          <p className="hidden lg:flex text-[16px] mt-2 text-gray-300">support@hms.com</p>
          <p className="text-[16px] mt-2 text-gray-300">+88015-12345-6789</p>
        </div>

        {/* Account */}
        <div>
          <h2 className="text-[20px]">Account</h2>
          <ul className="mt-3 space-y-4 text-[16px] text-gray-300">
            <li>My Account</li>
            <li>Login / Register</li>
            <li>My Appointments</li>
            <li>Medical Records</li>
            <li>Billing & Payments</li>
          </ul>
        </div>

        {/* Quick Link */}
        <div>
          <h2 className="text-[20px]">Quick Link</h2>
          <ul className="mt-3 space-y-4 text-[16px] text-gray-300">
            <li>Privacy Policy</li>
            <li>Terms Of Use</li>
            <li>FAQ</li>
            <li>Contact</li>
          </ul>
        </div>

        {/* Download App */}
        <div>
          <h2 className="text-[20px]">Download App</h2>
          <div className="mt-3 flex items-center space-x-2">
            <img src="/QRCode.svg" alt="QR Code" className="w-[76px] h-[76px]" />
            <div className="flex flex-col space-y-2">
              <img src="/GGPlay.svg" alt="Google Play" className="w-28" />
              <img src="/AppStore.svg" alt="App Store" className="w-28" />
            </div>
          </div>
          <div className="hidden lg:flex justify-left space-x-7 ml-2 mt-6">
            <img src="/Facebook.svg" alt="Facebook" className="w-[10.5px] h-[18px] cursor-pointer" />
            <img src="/Twitter.svg" alt="Twitter" className="h-[19px] cursor-pointer" />
            <img src="/Instagram.svg" alt="Instagram" className="w-[18px] h-[18px] cursor-pointer" />
            <img src="/Linkedin.svg" alt="Facebook" className="w-[17.5px] h-[17.5px] cursor-pointer" />
          </div>

        </div>
      </div>

      {/* Social Icons & Copyright */}
      <div className="mt-4 pt-6 text-center text-sm text-gray-500">
        <p>© Copyright Hospital Management System 2022. All rights reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
