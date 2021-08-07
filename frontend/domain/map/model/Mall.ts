import { IDistributedDoc } from "../port/IDistributedDoc";
import { Shop } from "./Shop";
import { Direction, Shopper } from "./Shopper";

export class Mall {
  constructor(private name: string, private distributedDoc: IDistributedDoc) {
    distributedDoc.init(name);
  }
  async enter(props: { name: string; avatar: string }) {
    // Check if this shopper already exists
    const existingShopper = this.distributedDoc.findShopperByName(props.name);
    if (existingShopper)
      throw new Error("This name already exists, please pick another one");
    this.distributedDoc.addNewShopper({
      name: props.name,
      avatar: props.avatar,
      positionX: 0,
      positionY: 0,
      moving: false,
      direction: Direction.Right,
      cart: [],
    });
  }

  addShop(shop: Shop) {
    this.distributedDoc.addNewShop(shop);
  }

  shoppers() {
    return this.distributedDoc.allShoppers();
  }

  printShoppers() {
    console.log("List of shoppers :");
    const shoppers = this.shoppers();
    shoppers.forEach((shopper) => console.log(shopper));
  }

  computeShopperPosition(shopper: Shopper, direction: Direction) {
    const { positionX, positionY } = shopper;
    switch (direction) {
      case Direction.Up:
        shopper.positionY = Math.max(0, positionY - 5);
        break;
      case Direction.Down:
        shopper.positionY = Math.min(500, positionY + 5);
        break;
      case Direction.Left:
        shopper.positionX = Math.max(0, positionX - 5);
        break;
      case Direction.Right:
        shopper.positionX = Math.min(800, positionX + 5);
        break;
    }
  }

  moveShopper(name: string, direction: Direction) {
    const shopper = this.distributedDoc.findShopperByName(name);
    if (shopper) {
      shopper.moving = true;
      shopper.direction = direction;
      this.computeShopperPosition(shopper, direction);
      this.distributedDoc.updateShopper(shopper);
    }
  }
  stopShopper(name: string) {
    const shopper = this.distributedDoc.findShopperByName(name);
    if (shopper) {
      shopper.moving = false;
    }
  }
}
