import type { ComponentProps } from "react";

interface TableRowProps extends ComponentProps<"tr"> {
  variant?: boolean;
}

export function TableRow({ variant, ...rest }: TableRowProps) {
  return (
    <tr
      {...rest}
      className={
        variant === true
          ? "hover:bg-muted/10 transition-colors hover:bg-gray-100/10"
          : "border-b border-gray-200/50"
      }
    />
  );
}
