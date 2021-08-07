import { Mall } from "../map/model/Mall";
import { Shopper } from "../map/model/Shopper";
import { graphicLibrary } from "./GraphicLibrary";

export class GraphicEngine {
  _timer: any = null;
  _cycle: number = 0;

  constructor(
    private _context: CanvasRenderingContext2D,
    public width: number,
    public height: number,
    public fps: number, // number of refresh per seconds [1, xxx]
    private _mall: Mall
  ) {}
  start() {
    const cycleMs = Math.round(1000 / this.fps);
    console.log("Starting GraphicEngine :", cycleMs);
    this._timer = setInterval(() => this.animate(), cycleMs);
  }
  release() {
    this._timer && clearInterval(this._timer);
  }

  cycle() {
    if (this._cycle >= this.fps) {
      this._cycle = 0;
    } else {
      this._cycle += 1;
    }
  }
  shouldRefresh(speed: number) {
    if (speed > this.fps) {
      return this._cycle === 0;
    } else {
      return this._cycle % speed == 0;
    }
  }
  animate() {
    this.cycle();
    // const background= new Image()
    // background.src = 'background.png'
    this._context.clearRect(0, 0, this.width, this.height);
    this._mall.shoppers().forEach((shopper) => this.drawShopper(shopper));
  }

  drawShopper(shopper: Shopper) {
    const { height, width, srcX, srcY, srcImage } =
      graphicLibrary.getSpriteAvatarFromBoard(
        shopper.avatar,
        shopper.direction,
        shopper.moving,
        this._cycle
      );
    this._context.drawImage(
      srcImage,
      srcX,
      srcY,
      width,
      height,
      shopper.positionX,
      shopper.positionY,
      width,
      height
    );
  }
}
