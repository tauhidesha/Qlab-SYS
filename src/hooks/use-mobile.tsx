
import React, { useState, useEffect } from "react";

const MOBILE_BREAKPOINT = 768;

export function useIsMobile(): boolean { // Ensure hook returns a boolean
  const [isMobile, setIsMobile] = useState(false); // Default to false (desktop) for SSR

  useEffect(() => {
    const checkIsMobile = () => {
      return window.innerWidth < MOBILE_BREAKPOINT;
    }
    
    // Set the correct value on client mount
    setIsMobile(checkIsMobile());

    const handleResize = () => {
      setIsMobile(checkIsMobile());
    };

    window.addEventListener("resize", handleResize);
    
    // Cleanup listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty dependency array ensures this runs only on the client side

  return isMobile;
}
