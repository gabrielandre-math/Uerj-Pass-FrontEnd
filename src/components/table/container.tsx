/* eslint-disable @typescript-eslint/no-empty-object-type */
import type { ComponentProps } from "react";

interface ContainerProps extends ComponentProps<"div"> {}

export function Container(props: ContainerProps) {
  return <div {...props} className="flex flex-col gap-1" />;
}
