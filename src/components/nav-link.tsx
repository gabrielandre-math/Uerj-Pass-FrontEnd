import type { ComponentProps } from "react";

interface NavLinkProps extends ComponentProps<"a"> {
  children: string;
}
export function NavLink(props: NavLinkProps) {
  return (
    <>
      <a
        {...props}
        className="
            font-medium
            text-foreground         
            hover:text-primary     
            transition
            "
      >
        {props.children}
      </a>
    </>
  );
}
