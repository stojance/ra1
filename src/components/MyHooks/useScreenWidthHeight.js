import { useEffect, useState } from "react";

export default function useScreenWidthHeight() {
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handler = (event) => {
      setWidth(event.target.innerWidth);
      setHeight(event.target.innerHeight);
    };

    window.addEventListener("resize", handler);

    return () => {
      window.removeEventListener("resize", handler);
    };
  }, []);

  return {width, height};
}
