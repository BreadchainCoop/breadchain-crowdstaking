import React from "react";
import { gsap } from "gsap";

import { useAppSelector } from "../store/hooks";

const TextTransition: React.FC<React.PropsWithChildren<unknown>> = (props) => {
  const { font } = useAppSelector((state) => state);

  const ref: React.RefObject<HTMLElement> = React.useRef(null);

  React.useEffect(() => {
    if (!font.isLoaded) return;
    gsap.to(ref.current, {
      duration: 0.3,
      opacity: 1,
      ease: "power3.in",
    });
  }, [font.isLoaded]);

  return (
    <span className={font.isLoaded ? "" : "opacity-0"} ref={ref}>
      {props.children}
    </span>
  );
};

export default TextTransition;
