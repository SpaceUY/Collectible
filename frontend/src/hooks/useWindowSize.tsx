import { useEffect, useState } from "react";

function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: 1200,
    height: 1200,
    mediaQuery: "md",
  });

  useEffect(() => {
    function handleResize() {
      const width = window.innerWidth;
      let mediaQuery = "xs";

      if (width >= 1536) {
        mediaQuery = "2xl";
      } else if (width >= 1280) {
        mediaQuery = "xl";
      } else if (width >= 1024) {
        mediaQuery = "lg";
      } else if (width >= 768) {
        mediaQuery = "md";
      } else if (width >= 640) {
        mediaQuery = "sm";
      }

      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
        mediaQuery,
      });
    }

    window.addEventListener("resize", handleResize);
    handleResize(); // Call the function right away to update state with initial values

    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures this effect is only run on mount and unmount

  return windowSize;
}

export default useWindowSize;
