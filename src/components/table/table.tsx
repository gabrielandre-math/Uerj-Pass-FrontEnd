/* eslint-disable @typescript-eslint/no-empty-object-type */
import type { ComponentProps } from "react";

interface TableProps extends ComponentProps<"table"> {}

export function Table(props: TableProps) {
  return (
    <div className="border border-gray-200/50 rounded-lg">
      <table {...props} className="w-full" />
    </div>
  );
}
