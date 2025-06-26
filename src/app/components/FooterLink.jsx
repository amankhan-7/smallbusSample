import Link from "next/link";

const FooterLink = ({ href, children }) => (
  <li>
    <Link href={href}>
      <span className="text-gray-600 hover:text-primary cursor-pointer">
        {children}
      </span>
    </Link>
  </li>
);

export default FooterLink;
