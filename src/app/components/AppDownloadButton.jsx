import Link from "next/link";

const AppDownloadButton = ({ href, iconClass, label }) => (
  <Link
    href={href}
    className="flex items-center gap-2 bg-black text-white px-4 py-4 rounded-lg hover:bg-gray-800"
  >
    <i className={iconClass}></i>
    {label}
  </Link>
);

export default AppDownloadButton;
