import React from "react";
import Link from "next/link";
import { Instagram } from "lucide-react";
import { buttonVariants } from "./ui/button";
import { pacifico } from "./fonts";

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

      <h1
        className={`${pacifico.className} text-primary text-4xl font-bold text-center hidden 2xl:block`}
      >
        InstaPix
      </h1>
    </Link>
  );
};

export default Logo;
