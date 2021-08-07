// On the map, we draw the sprites

export type Sprite = {
  posX: number;
  posY: number;
  height: number;
  width: number;
  srcImage: string;
  srcX: number;
  srcY: number;
  block: boolean; // If true, the shopper cannot move above this sprite (Ex : wall)
  moving: boolean; // If true, it is a moving sprite. Else it's a piece of background
  content: string; // id of the content to display to shopper (productId, sellerId)
};
