
import { Sprout, Package2, Recycle, Box } from "lucide-react";
import { Facebook, Linkedin, Instagram, TwitterIcon } from "lucide-react";
import { User, UserRoundCog, LockKeyhole , Home} from "lucide-react";

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

export const CollectionItems = [
  {
    title: "Beautiful Plant Varieties",
    desc: "Luctus nec ullamcorper mattis, pulvinar dapibus leo.",
    img: "/cactus2-free-img.jpg",
  },
  {
    title: "Trendy Cactus Varieties",
    desc: "Luctus nec ullamcorper mattis, pulvinar dapibus leo.",
    img: "/cactus4-free-img.jpg",
  },
  {
    title: "Gardening Accessories",
    desc: "Luctus nec ullamcorper mattis, pulvinar dapibus leo.",
    img: "/cactus6-free-img.jpg",
  },
];

export function FormatPrice(price: { value: number; currency: "USD" | "EUR" }) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: price.currency,
  }).format(price.value);
}

export const DamyData: {
  image: string;
  price: {
    value: number;
    currency: "USD" | "EUR";
  };
  discountPrice?: number;
  rating: number;
  title: string;
  category: string;
}[] = [
  {
    image: "/plant1-free-img.jpg",
    category: "Cactus",
    title: "Cleistocactus",
    price: {
      value: 25.0,
      currency: "USD",
    },
    rating: 0,
  },
  {
    image: "/plant3-free-img.jpg",
    category: "Cactus",
    title: "Cleistocactus",
    price: {
      value: 18.0,
      currency: "USD",
    },
    rating: 0,
  },
  {
    image: "/plant4-free-img.jpg",
    category: "Cactus",
    title: "Cleistocactus",
    price: {
      value: 20.0,
      currency: "USD",
    },
    rating: 0,
  },
  {
    image: "/plant5-free-img.jpg",
    category: "Cactus",
    title: "Cleistocactus",
    price: {
      value: 24.0,
      currency: "USD",
    },
    discountPrice: 36,
    rating: 0,
  },
  {
    image: "/plant6-free-img.jpg",
    category: "Cactus",
    title: "Cleistocactus",
    price: {
      value: 25.0,
      currency: "USD",
    },
    discountPrice: 30,
    rating: 0,
  },
];

export const Social = [Facebook, Linkedin, Instagram, TwitterIcon];

export const Addresses = [
  {
    id: "1",
    city: "Bouznika",
    country: "maroc",
    codePostal: 13100,
  },
  {
    id: "2",
    city: "Bouznika",
    country: "maroc",
    codePostal: 13100,
  },
];

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



export type Orders = [
  {
    id : "jskjoainkjdszilla",
    isDelaiverd : false,
    
  }
]


export const DOMAINE_NAME = "https://plante-stora.onrender.com";

export const COUPON = "9a950c39-5b33-4736-9ec0-f3bd0e110534"