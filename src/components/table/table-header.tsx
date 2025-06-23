/* eslint-disable @typescript-eslint/no-empty-object-type */
import type { ComponentProps } from "react";

interface TableHeaderProps extends ComponentProps<"tr"> {}
export function TableHeader(props: TableHeaderProps) {
  return (
    <th className="py-3 px-4 text-sm font-semibold text-left">
      {props.children}
    </th>
  );
}
