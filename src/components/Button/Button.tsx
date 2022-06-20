import React from "react";
import TextTransition from "../../transitions/TextTransition";

interface IProps {
  onClick: (event: React.MouseEvent) => void;
  disabled?: boolean;
  children: string;
  variant?: "small" | "regular" | "large";
  fullWidth?: boolean;
}

const Button = ({
  children,
  variant = "regular",
  fullWidth = false,
  onClick,
  disabled = false,
}: IProps) => {
  const [mouseIsDown, setMouseIsDown] = React.useState(false);
  let classList =
    "relative flex items-center justify-center button-gradient button-shadow bg-opacity-85 text-neutral-900 hover:bg-opacity-100";

  const smallClasses = " px-6 py-3 text-xs sm:text-sm";
  const regularClasses = " px-6 py-3 text-xs sm:text-sm";
  const largeClasses = " px-6 py-3 text-xl sm:text-2xl";

  switch (variant) {
    case "small":
      classList += smallClasses;
      break;
    case "regular":
      classList += regularClasses;
      break;
    case "large":
      classList += largeClasses;
      break;
  }

  if (fullWidth) classList += " w-full";

  const handleMouseDown = () => {
    setMouseIsDown(true);
  };

  const handleMouseUp = () => {
    setMouseIsDown(false);
  };

  return (
    <button
      className={classList + (mouseIsDown ? " transform translate-y-1" : "")}
      onClick={onClick}
      disabled={disabled}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      <div className="absolute w-1 h-full left-0 transform -translate-x-1 bg-button-border"></div>
      <div className="absolute w-1 h-full right-0 transform translate-x-1 bg-button-border"></div>
      <div className="absolute w-full h-1 top-0 left-0 right-0 transform -translate-y-1 bg-button-border"></div>
      <div
        className={
          "absolute w-full h-1 bottom-0 left-0 right-0 transform translate-y-1 bg-button-border" +
          (mouseIsDown ? " display-none" : "")
        }
      ></div>
      <TextTransition>{children}</TextTransition>
    </button>
  );
};

export default Button;
