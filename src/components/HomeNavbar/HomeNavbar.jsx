import Navbar from "@/components/Navbar";

const navItems = [
  { name: "Home", href: "/" },
  { name: "My Trips", href: "/trips" },
  { name: "Help", href: "/help" },
];

export default function HomePage() {
  return (
    <>
      <Navbar
        navItems={navItems}
        logoText="smallbus"
        loginUrl="/login"
        showLogin={true}
      />
    </>
  );
}
