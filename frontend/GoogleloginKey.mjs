// #!/bin/node

// import { SignJWT } from "jose"
// import { createPrivateKey } from "crypto"

// const team_id = process.env.APPLE_TEAM_ID
// const iss = team_id

// const private_key = `-----BEGIN PRIVATE KEY-----
// MIGTAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBHkwdwIBAQQg0kzJkvXg1kMvQVfz
// 8u+QazHzFWNnd4Omg/1qFUbAYbygCgYIKoZIzj0DAQehRANCAATozPJd0hk6Da1p
// skFiHzD+TlNFotwWQ+fAr7GjHp2KIOfBD0nAVg51vACf32/1GKL8Yhpy+dAZBcmS
// bACvR75o
// -----END PRIVATE KEY-----`

// const client_id = process.env.APPLE_CLIENT_ID
// const sub = client_id

// const key_id = process.env.APPLE_PRIVATE_KEY_ID
// const kid = key_id

// const expires_in = 86400 * 180
// const exp = Math.ceil(Date.now() / 1000) + expires_in

// /**
//  * How long is the secret valid in seconds.
//  * @default 15780000
//  */
// const expiresAt = Math.ceil(Date.now() / 1000) + expires_in
// const expirationTime = exp ?? expiresAt
// console.log(`
// Apple client secret generated. Valid until: ${new Date(expirationTime * 1000)}
// ${await new SignJWT({})
//   .setAudience("https://appleid.apple.com")
//   .setIssuer(iss)
//   .setIssuedAt()
//   .setExpirationTime(expirationTime)
//   .setSubject(sub)
//   .setProtectedHeader({ alg: "ES256", kid })
//   .sign(createPrivateKey(private_key.replace(/\\n/g, "\n")))}`)





import nJwt from "njwt";
import { createPrivateKey } from "crypto";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const MINUTE = 60;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const MONTH = 30 * DAY;

const pk_raw = `-----BEGIN PRIVATE KEY-----
MIGTAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBHkwdwIBAQQg0kzJkvXg1kMvQVfz
8u+QazHzFWNnd4Omg/1qFUbAYbygCgYIKoZIzj0DAQehRANCAATozPJd0hk6Da1p
skFiHzD+TlNFotwWQ+fAr7GjHp2KIOfBD0nAVg51vACf32/1GKL8Yhpy+dAZBcmS
bACvR75o
-----END PRIVATE KEY-----`

const privateKey = createPrivateKey(pk_raw); // Copy from the cert you downloaded from Apple
const now = Math.ceil(Date.now() / 1000);
const expires = now + MONTH * 6;

const claims = {
  iss: process.env.APPLE_TEAM_ID,
  iat: now,
  exp: expires,
  aud: "https://appleid.apple.com",
  sub: process.env.APPLE_CLIENT_ID,
};

const jwt = nJwt.create(claims, privateKey, "ES256");
jwt.header.kid = process.env.APPLE_PRIVATE_KEY_ID;

console.log(jwt.compact());