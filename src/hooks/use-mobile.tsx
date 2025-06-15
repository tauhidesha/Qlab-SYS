
"use client";

import React from "react"; // Changed to default import

const MOBILE_BREAKPOINT = 768;

export function useIsMobile(): boolean { // Ensure hook returns a boolean
  const [isMobile, setIsMobile] = React.useState(false); // Explicitly use React.useState

  React.useEffect(() => { // Explicitly use React.useEffect
    const checkIsMobile = () => {
      // Ensure window is defined (for safety, though useEffect runs client-side)
      return typeof window !== 'undefined' && window.innerWidth < MOBILE_BREAKPOINT;
    }
    
    // Set the correct value on client mount
    setIsMobile(checkIsMobile());

    const handleResize = () => {
      setIsMobile(checkIsMobile());
    };

    if (typeof window !== 'undefined') {
      window.addEventListener("resize", handleResize);
      // Cleanup listener on component unmount
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []); // Empty dependency array ensures this runs only on the client side

  return isMobile;
}
