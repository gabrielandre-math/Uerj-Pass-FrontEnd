import type { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface TableDivisorProps extends ComponentProps<"td"> {
  variant?: boolean;
}

export function TableDivisor({
  variant,
  className,
  ...props
}: TableDivisorProps) {
  return (
    <td
      {...props}
      className={twMerge(
        "px-4 py-3",
        variant ? "" : "text-sm text-muted-foreground",
        className
      )}
    />
  );
}
