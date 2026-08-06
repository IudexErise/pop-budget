import PersonalIcon from "@components/categoryIcons/personal";
import FoodIcon from "../@components/categoryIcons/food";
import { Category } from "types/category";
import TransportIcon from "@components/categoryIcons/transport";
import EntertainmentIcon from "@components/categoryIcons/entertainment";
import BeautyIcon from "@components/categoryIcons/beauty";
import HealthIcon from "@components/categoryIcons/health";
import OtherIcon from "@components/categoryIcons/other";
import HomeIcon from "@components/categoryIcons/home";

export const categoriesList: Category[] = [
  {
    id: 1,
    name: "Food",
    color: "#FFD466",
    icon: FoodIcon,
    subCategories: [
      "Groceries",
      "Snacks",
      "Drinks",
      "Restaurants & Deliveries",
      "Alcohol",
    ],
  },
  {
    id: 2,
    name: "Household",
    color: "#3DB9FF",
    icon: PersonalIcon,
    subCategories: ["Cleaning products", "Kitchen products", "Dishes"],
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
    subCategories: ["VALORANT", "Concerts & Theater", "Online", "Events"],
  },
  {
    id: 5,
    name: "Beauty",
    color: "#FF66E7",
    icon: BeautyIcon,
    subCategories: ["Clothes", "Cosmetics", "Hairdresser"],
  },
  {
    id: 6,
    name: "Home",
    color: "#DB3C3C",
    icon: HomeIcon,
    subCategories: ["Rent", "Utilities", "Mobile & Internet"],
  },
  {
    id: 7,
    name: "Health",
    color: "#66DAFF",
    icon: HealthIcon,
    subCategories: ["Medicine", "Doctor"],
  },
  {
    id: 8,
    name: "Other",
    color: "#afb7c0",
    icon: OtherIcon,
    subCategories: ["Planned", "Unexpected", "Gifts"],
  },
];

export function getSelectedCategory(categoryName: string | null) {
  return categoriesList.find((c) => c.name === categoryName) ?? null;
}
