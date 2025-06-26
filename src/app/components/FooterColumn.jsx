import FooterLink from "./FooterLink";

const FooterColumn = ({ title, links }) => (
  <div>
    <h4 className="text-lg font-semibold mb-4">{title}</h4>
    <ul className="space-y-2">
      {links.map((link, index) => (
        <FooterLink key={`${link.href}-${index}`} href={link.href}>
          {link.label}
        </FooterLink>
      ))}
    </ul>
  </div>
);

export default FooterColumn;
