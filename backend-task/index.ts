import dotenv from "dotenv";
import express from "express";
import admin from "firebase-admin";
import client from "drip-nodejs";
({
  token: process.env.DRIP_TOKEN,
  tokenType: process.env.DRIP_TOKEN_TYPE,
  accountId: process.env.DRIP_ACCOUNT_ID,
});

dotenv.config({ path: __dirname + "/.env" });

const app = express();
app.use(express.json());

const PATH =
  process.env.DRIP_ACCOUNT_KEY_JSON_PATH || "./serviceAccountKey.json";

admin.initializeApp({
  credential: admin.credential.cert(PATH),
});

app.get("/sendUserToDrip", async (req, res) => {
  try {
    const { users } = await admin.auth().listUsers();

    const batches = {
      batches: [
        {
          users: users.map((user) => ({
            email: user.email,
          })),
        },
      ],
    };

    await client.updateBatchSubscribers(batches);

    res.send(users);
  } catch (err) {
      console.error(err.message);
  }
});

app.listen(process.env.API_PORT);
