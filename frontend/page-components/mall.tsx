import Head from "next/head";
import styles from "../styles/Mall.module.css";
import { useEffect, useRef, useState } from "react";
import { GraphicEngine } from "../domain/graphic/GraphicEngine";
import { Mall } from "../domain/map/model/Mall";
import { DistributedDocTest } from "../domain/map/test/DistributedDocTest";
import { Direction } from "../domain/map/model/Shopper";
import { YjsDistributedDoc } from "../adapters/YjsDistributedDoc";

const distributedDocTest = new YjsDistributedDoc();
const mall = new Mall("the-mall", distributedDocTest);

const keyPressedToDirection = (keyPressedCode: string) => {
  switch (keyPressedCode) {
    case "ArrowUp":
      return Direction.Up;
    case "ArrowDown":
      return Direction.Down;
    case "ArrowLeft":
      return Direction.Left;
    case "ArrowRight":
      return Direction.Right;
    default:
      return Direction.Right;
  }
};

export default function MallCanvas() {
  const [shopperName, setShopperName] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engine = useRef<GraphicEngine>();

  const upHandler = () => shopperName && mall.stopShopper(shopperName);
  const downHandler = (e: KeyboardEvent) =>
    shopperName && mall.moveShopper(shopperName, keyPressedToDirection(e.key));

  useEffect(() => {
    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext("2d");
      if (context) {
        engine.current = new GraphicEngine(context, 800, 500, 10, mall);
        engine.current.start();
        return () => {
          window.removeEventListener("keydown", downHandler);
          window.removeEventListener("keyup", upHandler);
          engine.current && engine.current.release();
        };
      }
    }
    console.log("Error : cannot initialize the graphic engine");
  }, [shopperName]);

  return (
    <div className={styles.main}>
      <canvas
        ref={canvasRef}
        className={styles.gameplay}
        width={800}
        height={500}
      />
      <div>
        Your name :{" "}
        <input
          value={shopperName}
          onChange={(e) => setShopperName(e.target.value)}
        ></input>
        <button
          onClick={() =>
            mall.enter({ name: shopperName, avatar: "grey-man.png" })
          }
        >
          Enter the mall !
        </button>
      </div>
      <div>
        <button onClick={() => mall.printShoppers()}>See all</button>
      </div>
    </div>
  );
}
