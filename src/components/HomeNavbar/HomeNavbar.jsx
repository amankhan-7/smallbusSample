import Navbar from "@/components/Navbar";

const navItems = [
  { name: "Home", href: "/" },
  { name: "My Trips", href: "/account?tab=booking" },
  { name: "Help", href: "/help" },
];

export default function HomeNavbar() {
  return (
    <>
      <Navbar
        navItems={navItems}
        logoText="smallbus"
        loginUrl="/login"
      />
    </>
  );
}
