import { Mall } from "../model/Mall";
import { DistributedDocTest } from "./DistributedDocTest";

var distributedDocTest: DistributedDocTest;

beforeEach(() => {
  distributedDocTest = new DistributedDocTest();
});

it("An initial mall is empty", async () => {
  const mall = new Mall("test-mall", distributedDocTest);
  const sprites = mall.shoppers();
  expect(sprites).toHaveLength(0);
});

it("When a shopper login, it appears on the map", async () => {
  const mall = new Mall("test-mall", distributedDocTest);
  await mall.enter({ name: "test-shopper1", avatar: "littleman" });
  await mall.enter({ name: "test-shopper2", avatar: "littleman" });
  const sprites = mall.shoppers();
  expect(sprites).toHaveLength(2);
});

it("2 shoppers cannot have the same name", async () => {
  const mall = new Mall("test-mall", distributedDocTest);
  await mall.enter({ name: "test-shopper", avatar: "littleman" });
  await expect(
    mall.enter({ name: "test-shopper", avatar: "dooly" })
  ).rejects.toThrow("This name already exists, please pick another one");
});
