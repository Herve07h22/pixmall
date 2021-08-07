import { Sprite } from "./Sprite";

export interface Product {
  name: string;
  img: string;
  description: string;
  price: number;
  undiscountedPrice?: number;
  sprite: Sprite;
}

export interface Rack {
  products: Product[];
}

export interface Shop {
  name: string;
  bannerImg: string;
  racks: Rack[];
}
