import React from "react";
import { gsap } from "gsap";

import { useAppSelector } from "../store/hooks";

type TTween = {
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  opacity?: number;
  ease?: string;
};

type TProps = {
  tweens: TTween[];
  delay?: number;
  onRenderClasses?: string;
};

const NiceTransition: React.FC<TProps> = (props) => {
  const { children } = props;
  const onRenderClasses = props.onRenderClasses ? props.onRenderClasses : "";

  const { font } = useAppSelector((state) => state);

  const refs: React.RefObject<HTMLElement>[] = [];

  const newChildren = React.Children.map(children, (child: any) => {
    // classes to apply to element when rendered and before tween runs
    const ref = React.useRef<HTMLElement>(null);
    refs.push(ref);
    return React.cloneElement(child, {
      ref,
      onRenderClasses: " " + onRenderClasses,
    });
  });

  React.useEffect(() => {
    if (!font.isLoaded) return;
    refs.forEach((ref) => {
      props.tweens.forEach((tween) => {
        gsap.to(ref.current, tween);
      });
    });
  }, [font.isLoaded]);

  return <>{newChildren}</>;
};

export const appendClasses = (props: any, classString: string) => {
  if (props.onRenderClasses) return classString + " " + props.onRenderClasses;
  return classString;
};

export default NiceTransition;
