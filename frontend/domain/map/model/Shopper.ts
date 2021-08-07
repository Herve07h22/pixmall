import { Product } from "./Shop";

export enum Direction {
  Up = 1,
  Down = 2,
  Left = 3,
  Right = 4,
}

export interface Shopper {
  name: string;
  avatar: string;
  positionX: number;
  positionY: number;
  direction: Direction;
  moving: boolean;
  cart: Product[];
}
