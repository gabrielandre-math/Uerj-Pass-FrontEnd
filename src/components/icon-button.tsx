import type { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface IconButtonProps extends ComponentProps<"button"> {
  transparent?: boolean;
}

export function IconButton({
  transparent,
  disabled,
  className,
  ...props
}: IconButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled}
      className={twMerge(
        "border border-gray-200 rounded-md p-1.5 transition-colors",

        !disabled &&
          transparent === true &&
          "bg-gray-100/5 hover:bg-gray-200/20",
        !disabled &&
          transparent !== true &&
          "bg-gray-300/20 hover:bg-gray-300/30",

        disabled && "bg-transparent cursor-not-allowed opacity-40",
        disabled && "hover:bg-transparent",

        className
      )}
    />
  );
}
