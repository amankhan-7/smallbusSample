import FooterColumn from "./FooterColumn";
import AppDownloadButton from "./AppDownloadButton";

const Footer = () => {
  const companyLinks = [
  { label: "About Us", href: "/about" },
  { label: "Careers", href: "/careers" },
  { label: "Blog", href: "/blog" },
];

const supportLinks = [
  { label: "Help Center", href: "/help" },
  { label: "Contact Us", href: "/contact" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms & Conditions", href: "/terms" },
];

  return (
    <footer className="bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          <FooterColumn title="Company" links={companyLinks} />
          <FooterColumn title="Support" links={supportLinks} />
          <div className="col-span-2">
            <h4 className="text-lg font-semibold mb-4">Download App</h4>
            <div className="flex space-x-3">
              <AppDownloadButton
                href="#"
                iconClass="fab fa-google-play"
                label="Google Play"
              />
              <AppDownloadButton
                href="#"
                iconClass="fab fa-apple"
                label="App Store"
              />
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 text-center">
          <p className="text-gray-600">&copy; 2025 SmallBus. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
