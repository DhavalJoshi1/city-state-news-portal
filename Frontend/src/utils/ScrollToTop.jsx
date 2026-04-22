import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * ScrollToTop Component:
 * Yeh component har baar URL (pathname) badalne par 
 * browser ki scroll position ko wapas top (0, 0) par bhej deta hai.
 */
const ScrollToTop = () => {
  // useLocation hook se humein current URL ka path milta hai
  const { pathname } = useLocation();

  useEffect(() => {
    // Window ko top-left corner par move karta hai
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant", // 'smooth' bhi kar sakte hain, par instant news portal ke liye better hai
    });
  }, [pathname]); // Jab bhi pathname badlega, ye effect chalega

  return null; // Yeh component kuch render nahi karta, sirf logic chalata hai
};

export default ScrollToTop;