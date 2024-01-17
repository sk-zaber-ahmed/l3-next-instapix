"use client";

import React from "react";
import {
  Clapperboard,
  Compass,
  Heart,
  Home,
  LucideIcon,
  MessageCircle,
  PlusSquare,
  Search,
} from "lucide-react";
import Link from "next/link";

import { usePathname } from "next/navigation";
import { NavigationLinks } from "@/lib/definitions";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";
import NavLinkAvatar from "./NavLinkAvatar";

const NavLinks = ({
  profileName,
  profileImage,
}: {
  profileName: string;
  profileImage: string;
}) => {
  const pathname = usePathname();

  const links: NavigationLinks[] = [
    { name: "Home", href: "/dashboard", icon: Home },
    {
      name: "Search",
      href: "/dashboard/search",
      icon: Search,
      hideOnMobile: true,
    },
    { name: "Explore", href: "/dashboard/explore", icon: Compass },
    {
      name: "Reels",
      href: "/dashboard/reels",
      icon: Clapperboard,
    },
    {
      name: "Messages",
      href: "/dashboard/messages",
      icon: MessageCircle,
    },
    {
      name: "Notifications",
      href: "/dashboard/notifications",
      icon: Heart,
      hideOnMobile: true,
    },
    {
      name: "Create",
      href: "/dashboard/create",
      icon: PlusSquare,
    },
    {
      name: "Profile",
      href: `/dashboard/${profileName}`,
    },
  ];

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon as LucideIcon;
        const isActive = pathname === link.href;

        return (
          <Link
            key={link.name}
            href={link.href}
            className={buttonVariants({
              variant: isActive ? "secondary" : "ghost",
              className: cn("navLink", {
                "hidden 2xl:flex": link.hideOnMobile,
              }),
              size: "lg",
            })}
          >
            {LinkIcon ? (
              <LinkIcon className="w-6" />
            ) : (
              <NavLinkAvatar image={profileImage} />
            )}
            <p
              className={`${cn("hidden xl:block", {
                "font-extrabold": isActive,
              })}`}
            >
              {link.name}
            </p>
          </Link>
        );
      })}
    </>
  );
};

export default NavLinks;
