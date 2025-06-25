import React from "react";
import { FaGooglePlay, FaApple } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-white md:px-4 md:py-6 lg:px-6 border-t border-gray-200">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-10 px-4 md:pl-20 max-w-7xl mx-2.5 md:mx-auto py-12 lg:py-12">
        {/* Company */}
        {/* <div>
          <h3 className="text-xl font-semibold mb-5 text-gray-900">Company</h3>
          <ul className="space-y-3 text-[15px] text-gray-600">
            <li>
              <a href="#" className="hover:text-[#004aad]">About Us</a>
            </li>
            <li>
              <a href="#" className="hover:text-[#004aad]">Careers</a>
            </li>
            <li>
              <a href="#" className="hover:text-[#004aad]">Blog</a>
            </li>
          </ul>
        </div> */}

        {/* Support */}
        <div>
          <h3 className="text-xl font-semibold mb-5 text-gray-900">Support</h3>
          <ul className="space-y-3 text-[15px] text-gray-600">
            <li>
              <a href="#" className="hover:text-[#004aad]">Help Center</a>
            </li>
            <li>
              <a href="#" className="hover:text-[#004aad]">Contact Us</a>
            </li>
            <li>
              <a href="#" className="hover:text-[#004aad]">Privacy Policy</a>
            </li>
            <li>
              <a href="#" className="hover:text-[#004aad]">Terms & Conditions</a>
            </li>
          </ul>
        </div>
       

        {/* Get the App */}
        <div>
          <h3 className="text-xl font-semibold mb-5 text-gray-900">Download App</h3>
          <div className="flex flex-col gap-3">
            <a
              href="#"
              className="flex items-center lg:w-sm gap-2 bg-gray-900 text-white px-4 py-2.5 rounded-md text-sm font-medium hover:opacity-90"
            >
              <FaGooglePlay size={20} /> Google Play
            </a>
            <a
              href="#"
              className="flex items-center lg:w-sm gap-2 bg-gray-900 text-white px-4 py-2.5 rounded-md text-sm font-medium hover:opacity-90"
            >
              <FaApple size={21} /> App Store
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-200 py-6 md:py-8 h-16 md:h-16 lg:16 text-center text-sm text-gray-500">
        <p>&copy; {new Date().getFullYear()} SmallBus. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
