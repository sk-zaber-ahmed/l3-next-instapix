import { LucideIcon } from "lucide-react";

//Actual
export type NavigationLinks = {
  name: string;
  href: string;
  icon?: LucideIcon;
  hideOnMobile?: boolean;
};

export type ProfileTabs = {
  title: string;
  href: string;
  icon: LucideIcon;
};
//fake
export type Post = {
  id: string;
  caption: string;
  fileUrl: string;
  likes: any[];
  comments: any[];
};
export type UserProfile = {
  id: string;
  username: string;
  name: string;
  bio: string;
  posts: Post[];
  followedBy: any[];
  following: any[];
};
