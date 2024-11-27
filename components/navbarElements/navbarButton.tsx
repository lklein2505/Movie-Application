import React from "react";
import Link from "next/link";

const NavbarButton = ({ href, children }: { href: string; children: any }) => (
  <Link href={href} passHref>
    <button className="flex items-center space-x-1 hover:text-violet-300 font-bold">
      {children}
    </button>
  </Link>
);

export default NavbarButton;
