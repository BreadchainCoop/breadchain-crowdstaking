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
  const baseClasses =
    "relative flex items-center justify-center button-gradient button-shadow bg-opacity-85 text-neutral-900 hover:bg-opacity-100 " +
    (fullWidth ? "w-full " : "");

  const smallClasses = "px-4 py-3 text-xs sm:text-sm";
  const regularClasses = "px-4 py-3 text-xs sm:text-sm";
  const largeClasses = "px-4 py-3 text-xl sm:text-2xl";

  return (
    <button
      className={
        baseClasses +
        (variant === "small"
          ? smallClasses
          : variant === "large"
          ? largeClasses
          : regularClasses)
      }
      onClick={onClick}
      disabled={disabled}
    >
      <div className="absolute w-1 h-full left-0 transform -translate-x-1 bg-button-border"></div>
      <div className="absolute w-1 h-full right-0 transform translate-x-1 bg-button-border"></div>
      <div className="absolute w-full h-1 top-0 left-0 right-0 transform -translate-y-1 bg-button-border"></div>
      <div className="absolute w-full h-1 bottom-0 left-0 right-0 transform translate-y-1 bg-button-border"></div>
      <TextTransition>{children}</TextTransition>
    </button>
  );
};

export default Button;
