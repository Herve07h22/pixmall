const crypto = require("crypto");
const SECRET_KEY = process.env.SECRET_KEY || "eucbaihbiXJzunsJadnxod7j90jd53";

export function encrypt(text: string) {
  var hmac = crypto.createHmac("sha256", SECRET_KEY); // Single use
  return hmac.update(text).digest("hex");
}
