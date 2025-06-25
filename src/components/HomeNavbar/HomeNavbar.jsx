"use client";
import { useSelector } from "react-redux";
import { FaUser } from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";
import Navbar from "@/components/Navbar";

export default function HomePage() {
  const { isLoggedIn } = useSelector((state) => state.user);

  const actionLink = isLoggedIn
    ? {
        href: "/",
        label: "Login",
        icon: <FaUser size={16} />,
      }
    : {
        href: "/account",
        label: "Account",
        icon: <MdAccountCircle size={20} />,
      };

  const navItems = [
    { name: "Home", href: "/" },
    { name: "My Trips", href: "/trips" },
    { name: "Help", href: "/help" },
  ];

  return (
    <Navbar l
    ogoText="smallbus" 
    navItems={navItems} 
    actionLink={actionLink} />
  );
}
