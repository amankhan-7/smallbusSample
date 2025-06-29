"use client";
import { useSelector } from "react-redux";
import { FaUser } from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";
import Navbar from "@/components/Navbar";

const navItems = [
  { name: "Home", href: "/" },
  { name: "My Trips", href: "/account?tab=bookingHistory" },
  { name: "Help", href: "/help" },
];

export default function HomeNavbar() {
  return (
    <>
      <Navbar
        navItems={navItems}
        logoText="smallbus"
      />
    </>
  );
}
