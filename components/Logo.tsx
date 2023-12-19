import React from "react";
import Link from "next/link";
import { Instagram } from "lucide-react";
import { buttonVariants } from "./ui/button";

const Logo = () => {
  return (
    <Link
      href={"/dashboard"}
      className={buttonVariants({
        className:
          "navLink hidden md:flex !mb-10 2xl:hover:bg-transparent 2xl:!p-0 ",
        variant: "ghost",
        size: "lg",
      })}
    >
      <Instagram className="h-6 w-6 shrink-0 2xl:hidden" />

      <p className={`text-semibold text-3xl hidden 2xl:block `}>Instapix</p>
    </Link>
  );
};

export default Logo;
