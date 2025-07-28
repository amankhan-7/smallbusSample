"use client";
import Image from "next/image";
import { forwardRef } from "react";

/**
 * Favicon components for different use cases
 */
export const FaviconIcon = forwardRef(
  ({ size = 16, className = "", ...props }, ref) => (
    <Image
      ref={ref}
      src="/favicon-32x32.png"
      alt="SmallBus Favicon"
      width={size}
      height={size}
      className={className}
      style={{
        width: size,
        height: size,
      }}
      {...props}
    />
  )
);
FaviconIcon.displayName = "FaviconIcon";

/**
 * Apple Touch Icon component
 */
export const AppleTouchIcon = forwardRef(
  ({ size = 180, className = "", ...props }, ref) => (
    <Image
      ref={ref}
      src="/apple-touch-icon.png"
      alt="SmallBus Apple Touch Icon"
      width={size}
      height={size}
      className={className}
      style={{
        width: size,
        height: size,
      }}
      {...props}
    />
  )
);
AppleTouchIcon.displayName = "AppleTouchIcon";

/**
 * Android Chrome Icons
 */
export const AndroidIcon192 = forwardRef(
  ({ size = 192, className = "", ...props }, ref) => (
    <Image
      ref={ref}
      src="/android-chrome-192x192.png"
      alt="SmallBus Android Icon"
      width={size}
      height={size}
      className={className}
      style={{
        width: size,
        height: size,
      }}
      {...props}
    />
  )
);
AndroidIcon192.displayName = "AndroidIcon192";

export const AndroidIcon512 = forwardRef(
  ({ size = 512, className = "", ...props }, ref) => (
    <Image
      ref={ref}
      src="/android-chrome-512x512.png"
      alt="SmallBus Android Icon"
      width={size}
      height={size}
      className={className}
      style={{
        width: size,
        height: size,
      }}
      {...props}
    />
  )
);
AndroidIcon512.displayName = "AndroidIcon512";

/**
 * Main Logo Component - Enhanced from svg-components.jsx
 */
export const Logo = forwardRef(
  (
    { width = 120, height, className = "", priority = false, ...props },
    ref
  ) => {
    // Use explicit height or default to width for square aspect ratio to avoid SSR issues
    const logoHeight = height || width;

    return (
      <Image
        ref={ref}
        src="/logo.svg"
        alt="SmallBus Logo"
        width={width}
        height={logoHeight}
        className={className}
        priority={priority}
        unoptimized={false}
        {...props}
      />
    );
  }
);
Logo.displayName = "Logo";

/**
 * Background Image Component
 */
export const BackgroundImage = forwardRef(
  ({ width = 1920, height = 1080, className = "", ...props }, ref) => (
    <Image
      ref={ref}
      src="/background.jpg"
      alt="SmallBus Background"
      width={width}
      height={height}
      className={className}
      style={{
        width: "100%",
        height: "auto",
      }}
      {...props}
    />
  )
);
BackgroundImage.displayName = "BackgroundImage";

/**
 * Icon Selector Hook - Choose appropriate icon based on context
 */
export const useIconSelector = (context = "default") => {
  switch (context) {
    case "navbar":
    case "header":
      return Logo;
    case "favicon":
      return FaviconIcon;
    case "apple":
      return AppleTouchIcon;
    case "android-192":
      return AndroidIcon192;
    case "android-512":
      return AndroidIcon512;
    case "background":
      return BackgroundImage;
    default:
      return Logo;
  }
};

/**
 * Universal Icon Component with dynamic selection
 */
export const SmallBusIcon = ({
  variant = "logo",
  size,
  className = "",
  ...props
}) => {
  const IconComponent = useIconSelector(variant);

  return <IconComponent size={size} className={className} {...props} />;
};

export default SmallBusIcon;
