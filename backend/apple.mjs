// const nJwt = require("njwt");
import { createPrivateKey } from "crypto";
import nJwt from "njwt";

const MINUTE = 60;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const MONTH = 30 * DAY;

// NOTE: The values are found in .env.local in the frontend folder

const privateKey = createPrivateKey(process.env.NEXT_PUBLIC_APPLE_PRIVATE_KEY); // Copy from the cert you downloaded from Apple
const now = Math.ceil(Date.now() / 1000);
const expires = now + MONTH * 3;
const kid = process.env.APPLE_KEY_ID; // Found in the Apple Developer Portal

const claims = {
  iss: process.env.NEXT_PUBLIC_APPLE_TEAM_ID,
  iat: now,
  exp: expires,
  aud: "https://appleid.apple.com",
  sub: process.env.NEXT_PUBLIC_APPLE_CLIENT_ID,
};

const jwt = nJwt.create(claims, privateKey, "ES256");
jwt.header.kid = kid;

console.log(jwt.compact());