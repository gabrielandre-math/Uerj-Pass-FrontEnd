import type { ComponentProps } from "react";

interface SpanProps extends ComponentProps<"span"> {
  variant?: boolean;
}
export function Span({ variant, ...props }: SpanProps) {
  return (
    <span
      className={
        variant === true
          ? "text-xs text-muted-foreground"
          : "text-sm font-semibold text-foreground"
      }
    >
      {props.children}
    </span>
  );
}
