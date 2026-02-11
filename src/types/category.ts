import { ComponentType } from "react";
import { IconProps } from "./icon";

export interface Category {
  id: number;
  name: string;
  color: string;
  icon: ComponentType<IconProps>;
  subCategories: string[];
}
