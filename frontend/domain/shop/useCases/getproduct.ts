import { IDependencies } from "../../IDependencies";

export function addGuest(
  params: { productId: string },
  dependencies: IDependencies
): void {}

addGuest.restricted = ["Admin", "Shopper", "Public"];

addGuest.schema = {
  type: "object",
  properties: {
    productId: { type: "string" },
  },
  additionalProperties: true,
};
