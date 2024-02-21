
import { Sprout, Package2, Recycle, Box } from "lucide-react";
import { Facebook, Linkedin, Instagram, TwitterIcon } from "lucide-react";
import { User, UserRoundCog, LockKeyhole , Home} from "lucide-react";

export type TPagination = {
  page: number,
  limit:  number,
  total: number,
  totalPages: number
}

export const HeaderItems = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "About",
    link: "/about",
  },
  {
    name: "Shop",
    link: "/shop",
  },
];

export const SectionItems = [
  {
    icon: Sprout,
    title: "Plants Collection",
    description: "Any plants for your space",
  },
  {
    icon: Package2,
    title: "Free Shipping",
    description: "Free shipping on order",
  },
  {
    icon: Recycle,
    title: "100% Money Back",
    description: "If the item didn't suit you",
  },
];


export function FormatPrice(price: { value: number; currency: "USD" | "EUR" }) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: price.currency,
  }).format(price.value);
}


export const Social = [Facebook, Linkedin, Instagram, TwitterIcon];



export type TUser = {
  id: string;
  name: string;
  profile: string;
  createdAt: string;
  email: string;
};

export const SideBarItems = [
  {
    link: "/",
    icon: Home,
    name: "Home",
  },
  {
    link: "/profile/me",
    icon: User,
    name: "My Profile",
  },
  {
    link: "/profile/update-profile",
    name: "Update Profile",
    icon: UserRoundCog,
  },
  {
    link: "/profile/change-password",
    name: "Change Password",
    icon: LockKeyhole,
  },
  {
    link: "/profile/my-order",
    name: "My Order",
    icon: Box,
  },
];

export type TAddress = {
  id: string;
  userId: string;
  city: string;
  country : string;
  street: string;
  codePostal: number;
  createdAt: Date;
  updatedAt: Date;
};



export type TPLante = {
  id : string ;
  name: string;
  categoryId: string;
  description:string;
  imageUrl: string;
  price: number;
  currency: "USD" | "EUR";
  discountPrice: 22;
  rating: number;
  createdAt: string;
  updatedAt: string;
}





export const DOMAINE_NAME = "https://plante-stora.onrender.com";

export const COUPON = "9a950c39-5b33-4736-9ec0-f3bd0e110534"