//typescript types are defined here
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
//post schema will be of my business logic
export type Post = {
  id: string;
  userId: string;
  caption: string;
  fileUrl: string[];
  likes: object[];
  comments: object[];
};

export type fakepost={
  _id:string,
  lane:string,
  level:string,
  category: string;
  choosenType: string;
  productStatus: string;
  productName: string;
  brand: string;
  model: string;
  description: string;
  images: string[];
  originalPacking: boolean;
  basePrice: number;
  currentPrice: number;
  duration: number;
  timer: number;
  soldAt: Date;
  catergory: string;
  auctionStarted: boolean;
  auctionEnded: boolean;
  sold: boolean;
  owner: string;
  purchasedBy: object;
  currentBidder: object;
  likedBy: object[];
  biddingEndsAt: Date;
}
export type UserProfile = {
  id: string;
  username: string;
  name: string;
  bio: string;
  posts: Post[];
  followedBy: any[];
  following: any[];
};
