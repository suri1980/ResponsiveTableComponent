import React, {useState, useEffect} from 'react';

const useViewport = () => {
    const [mediaWidth, setWidth] = useState(window.innerWidth);
    const [mediaHeight, setHeight] = useState(window.innerHeight);
  
    useEffect(() => {
      const handleWindowResize = () => {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
      }
  
      window.addEventListener("resize", handleWindowResize);
      return () => window.removeEventListener("resize", handleWindowResize);
    }, []);
  
    return { mediaWidth, mediaHeight };
  }

  export default useViewport;