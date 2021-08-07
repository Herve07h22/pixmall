const Y = require("yjs");
const { WebsocketProvider } = require("y-websocket");
require("dotenv").config();

const doc = new Y.Doc();
const wsProvider = new WebsocketProvider(
  `ws://${process.env.PIXMALL_HOST || "localhost"}:1234`,
  "pixmall",
  doc,
  { WebSocketPolyfill: require("ws") }
);
const shoppers = new Y.Map();
const shops = new Y.Map();

wsProvider.on("status", (event) => {
  console.log(event.status); // logs "connected" or "disconnected"
});

shoppers.observe((event) => {
  // print updates when the data changes
  console.log("shoppers: ", shoppers.toJSON());
});
