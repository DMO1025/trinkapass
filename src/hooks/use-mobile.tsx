import * as React from "react"

const DEFAULT_MOBILE_BREAKPOINT = 768; // Default to Bootstrap's md breakpoint

/**
 * Custom hook to determine if the current viewport width is considered mobile.
 * @param breakpoint The width (in pixels) at which the layout is considered mobile (i.e., screen width < breakpoint). Defaults to 768px.
 * @returns True if the screen width is less than the breakpoint, false otherwise. Returns false during SSR or before initial hydration.
 */
export function useIsMobile(breakpoint: number = DEFAULT_MOBILE_BREAKPOINT): boolean {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined);

  React.useEffect(() => {
    // Ensure this effect runs only in the client-side environment
    if (typeof window === 'undefined') {
      return;
    }

    // Media query to check if screen width is less than the breakpoint
    const mql = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    
    const onChange = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    // Initial check
    onChange();
    
    // Listen for changes in screen size
    mql.addEventListener("change", onChange);
    
    // Cleanup listener on component unmount
    return () => mql.removeEventListener("change", onChange);
  }, [breakpoint]); // Re-run effect if breakpoint changes

  // Return false during SSR or before hydration, then the actual value client-side.
  // This means desktop layout is assumed on the server.
  return isMobile === undefined ? false : isMobile;
}
