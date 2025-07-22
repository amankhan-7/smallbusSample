
"use client";

import Image from "next/image";
import { forwardRef } from "react";

export const SvgImage = forwardRef(
  (
    { src, alt, width, height, className = "", priority = false, ...props },
    ref
  ) => {
    const svgSrc = src.startsWith("/") ? src : `/${src}`;

    return (
      <Image
        ref={ref}
        src={svgSrc}
        alt={alt}
        width={width}
        height={height}
        className={className}
        priority={priority}
        {...props}
      />
    );
  }
);

SvgImage.displayName = "SvgImage";

// For SVG as React Component (dynamic import)
export const SvgComponent = ({ name, className = "", size = 24, ...props }) => {
  // This would need to be implemented based on your SVG structure
  // For now, it's a placeholder for dynamic SVG component loading
  return (
    <div
      className={`svg-component ${className}`}
      style={{ width: size, height: size }}
      {...props}
    >
      {/* SVG content would be loaded here */}
    </div>
  );
};

// Logo component specifically for your logo.svg
export const Logo = ({
  width = 120,
  height = 50,
  className = "",
  ...props
}) => {
  return (
    <SvgImage
      src="/logo.svg"
      alt="SmallBus Logo"
      width={width}
      height={height}
      className={className}
      priority={true}
      {...props}
    />
  );
};

export default SvgImage;
