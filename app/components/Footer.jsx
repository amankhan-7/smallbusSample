import React from "react";
import { FaGooglePlay, FaApple } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-white pt-16 pb-8 border-t border-gray-200">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-10 px-4 max-w-7xl mx-auto">
        {/* Company */}
        <div>
          <h3 className="text-lg font-semibold mb-5 text-gray-900">Company</h3>
          <ul className="space-y-3 text-sm text-gray-700">
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
        </div>

        {/* Support */}
        <div>
          <h3 className="text-lg font-semibold mb-5 text-gray-900">Support</h3>
          <ul className="space-y-3 text-sm text-gray-700">
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
          <h3 className="text-lg font-semibold mb-5 text-gray-900">Get the App</h3>
          <div className="flex flex-col gap-3">
            <a
              href="#"
              className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2.5 rounded-md text-sm font-medium hover:opacity-90"
            >
              <FaGooglePlay size={18} /> Google Play
            </a>
            <a
              href="#"
              className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2.5 rounded-md text-sm font-medium hover:opacity-90"
            >
              <FaApple size={18} /> App Store
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-200 pt-8 h-16 text-center text-sm text-gray-600">
        <p>&copy; {new Date().getFullYear()} SmallBus. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
