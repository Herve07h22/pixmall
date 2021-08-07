import { NextApiResponse, NextApiRequest } from "next";
import { IncomingHttpHeaders } from "http";
import { encrypt } from "../../domain/helpers/token";
import Ajv from "ajv";
import { IDependencies } from "../../domain/IDependencies";

const checkAuthorization = (
  restricted: string[],
  headers: IncomingHttpHeaders
) => {
  console.log(restricted);
  if (restricted.includes("Public")) return [true, {}];

  if (
    headers.authorization &&
    headers.authorization.split(" ")[0] === "Bearer"
  ) {
    console.log("Authorization : ", headers.authorization);

    let token = headers.authorization.split(" ")[1];
    console.log("token : ", token);

    let decodedToken = token && token.split(".");
    console.log("decodedToken : ", decodedToken);

    // First part is base64 encoded object, which is liable to be a fake one
    let decodedData = JSON.parse(
      Buffer.from(decodedToken[0], "base64").toString("utf8")
    );
    console.log("decodedData : ", decodedData);

    // So let's sign it and compare the result
    let signedData = encrypt(decodedToken[0]);
    console.log("signedData : ", signedData);
    console.log("decodedToken[1] : ", decodedToken[1]);

    if (signedData === decodedToken[1]) {
      // This is ok
      console.log(
        "Expiration Checking:",
        decodedData.exp && Number(decodedData.exp) > Date.now()
      );
      // Is the token still valid and provides an role granted to execute the query ?
      if (
        decodedData.exp &&
        Number(decodedData.exp) > Date.now() &&
        decodedData.role &&
        restricted.includes(decodedData.role)
      ) {
        // params are overridden by decodedData to prevent malicious injection of data
        return [true, Object.assign({}, decodedData)];
      }
    }
  }
  return [false, {}];
};

export default function jsqelHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { slug } = req.query;

  const { body, method } = req;
  switch (method) {
    case "POST":
      const dependencies: IDependencies = {};

      const fn = require(`../../domain/${slug[0]}/useCases/${slug[1]}`);
      const { restricted, schema } = fn[slug[1]];

      const ajv = new Ajv(); // options can be passed, e.g. {allErrors: true}

      const [authorized, decodedToken] = checkAuthorization(
        restricted,
        req.headers
      );

      if (!authorized) {
        return res.status(401).end(`Not authorized`);
      }

      const params = Object.assign({}, body, decodedToken);

      const valid = ajv.validate(schema, params);

      if (!valid) {
        console.log(ajv.errors);
        return res.status(404).json(ajv.errors);
      }

      return res.status(200).json(fn[slug[1]](params, dependencies));
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
