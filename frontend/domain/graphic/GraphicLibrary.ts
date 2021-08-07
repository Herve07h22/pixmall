import { Direction } from "../map/model/Shopper";

class GraphicLibrary {
  private _images: Map<string, HTMLImageElement> = new Map();
  constructor() {}

  getSpriteBackgroundFromBoard(boardName: string) {
    return { height: 16, width: 16, srcX: 0, srcY: 0, srcImage: boardName };
  }

  getImage(imageName: string) {
    const cachedImage = this._images.get(imageName);
    if (!cachedImage) {
      const image: HTMLImageElement = new Image();
      image.src = imageName;
      this._images.set(imageName, image);
      return image;
    } else {
      return cachedImage;
    }
  }

  getSpriteAvatarFromBoard(
    boardName: string,
    direction: Direction,
    moving: boolean,
    cycle: number
  ) {
    // Avatar board is 384px * 32px including 24 16px * 32px sprites
    var directionOffset = 0;
    switch (direction) {
      case Direction.Right:
        directionOffset = 0;
        break;
      case Direction.Up:
        directionOffset = 6 * 16 * 1;
        break;
      case Direction.Left:
        directionOffset = 6 * 16 * 2;
        break;
      case Direction.Down:
        directionOffset = 6 * 16 * 3;
        break;
      default:
        directionOffset = 0;
    }
    const movingOffset = moving ? (cycle % 6) * 16 : 0;
    // if moving, use this._cycle to find the sprite
    return {
      height: 32,
      width: 16,
      srcX: directionOffset + movingOffset,
      srcY: 0,
      srcImage: this.getImage(boardName),
    };
  }
}

export const graphicLibrary = new GraphicLibrary();
