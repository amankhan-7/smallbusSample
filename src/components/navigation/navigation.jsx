"use client";

import { useState, useEffect } from "react";
import { Logo } from "./Logo";
import { DesktopNavigation } from "./DesktopNavigation";
import { MobileMenuToggle } from "./MobileMenuToggle";
import { MobileOverlay } from "./MobileOverlay";
import { MobileMenu } from "./MobileMenu";

export function Navigation({ showBackLink = false, backTo = "/" }) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", menuOpen);
  }, [menuOpen]);

  const handleMenuToggle = () => {
    setMenuOpen((prev) => !prev);
  };

  const handleMenuClose = () => {
    setMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-[0_1px_2px_rgba(0,0,0,0.05)] fixed top-0 left-0 right-0 z-[1000]">
      <div className="w-full py-[9.4px] max-w-[1200px] mx-auto px-[24px]">
        <div className="flex items-center justify-between h-[3rem]">
          <Logo />
          <DesktopNavigation />
          <MobileMenuToggle isOpen={menuOpen} onToggle={handleMenuToggle} />
        </div>
      </div>

      <MobileOverlay isOpen={menuOpen} onClose={handleMenuClose} />

      <MobileMenu
        isOpen={menuOpen}
        onLinkClick={handleMenuClose}
        showBackLink={showBackLink}
        backTo={backTo}
      />
    </header>
  );
}
