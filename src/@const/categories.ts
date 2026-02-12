import PersonalIcon from "@components/categoryIcons/personal";
import FoodIcon from "../@components/categoryIcons/food";
import { Category } from "types/category";
import TransportIcon from "@components/categoryIcons/transport";
import EntertainmentIcon from "@components/categoryIcons/entertainment";
import BeautyIcon from "@components/categoryIcons/beauty";
import HealthIcon from "@components/categoryIcons/health";
import OtherIcon from "@components/categoryIcons/other";
import HomeIcon from "@components/categoryIcons/home";

export const categories: Category[] = [
  {
    id: 1,
    name: "Food",
    color: "#FFD466",
    icon: FoodIcon,
    subCategories: [
      "Groceries",
      "Snacks",
      "Cafes & Restaurants",
      "Delivery",
      "Alcohol",
    ],
  },
  {
    id: 2,
    name: "Household & Personal",
    color: "#3DB9FF",
    icon: PersonalIcon,
    subCategories: ["Household", "Clothes", "Cosmetics"],
  },
  {
    id: 3,
    name: "Transport",
    color: "#66FFA3",
    icon: TransportIcon,
    subCategories: ["Public", "Taxi", "Travelling"],
  },
  {
    id: 4,
    name: "Entertainment",
    color: "#FF9466",
    icon: EntertainmentIcon,
    subCategories: ["Events", "Concerts", "Online"],
  },
  {
    id: 5,
    name: "Beauty",
    color: "#FF66E7",
    icon: BeautyIcon,
    subCategories: ["Cosmetics", "Hairdresser"],
  },
  {
    id: 6,
    name: "Home",
    color: "#DB3C3C",
    icon: HomeIcon,
    subCategories: ["Rent", "Utulities", "Mobile", "Internet"],
  },
  {
    id: 7,
    name: "Health",
    color: "#66DAFF",
    icon: HealthIcon,
    subCategories: ["Medcine", "Doctor"],
  },
  {
    id: 8,
    name: "Other",
    color: "#afb7c0",
    icon: OtherIcon,
    subCategories: ["Unexpected", "Planned"],
  },
];

export function getSelectedCategory(categoryName: string | null) {
  return categories.find((c) => c.name === categoryName) ?? null;
}
