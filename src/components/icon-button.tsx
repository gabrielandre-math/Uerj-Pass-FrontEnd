import type { ComponentProps } from "react";

interface IconButtonProps extends ComponentProps<"button"> {
  transparent?: boolean;
}

export function IconButton({ transparent, ...props }: IconButtonProps) {
  return (
    <button
      {...props}
      className={
        transparent === true
          ? "bg-gray-100/5 border border-gray-200 rounded-md p-1.5 hover:bg-gray-200/20 transition-colors"
          : "bg-gray-300/20 border border-gray-200 rounded-md p-1.5 hover:bg-gray-300/20 transition-colors"
      }
    />
  );
}
