/* eslint-disable @typescript-eslint/no-empty-object-type */
import type { ComponentProps } from "react";

interface TableBodyProps extends ComponentProps<"tbody"> {}
export function TableBody(props: TableBodyProps) {
  return <tbody {...props} className="divide-y divide-gray-200/50" />;
}
