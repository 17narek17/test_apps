const express = require("express");
const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");
const client = require('drip-nodejs')({ token: '28d35a67ae24030c81fee43e6d55ebae', tokenType: 'Bearer', accountId: 7216649 })

const app = express();
app.use(express.json());

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

app.get("/sendUserToDrip", async (req, res) => {
  const { users } = await admin.auth().listUsers();

  const batch = {
    "batches": [{
      "users": users.map(user => ({
        "email": user.email
      }))
    }]
  };

  client.updateBatchSubscribers(batch, () => {
      console.log("Users are sent")
    }
  );

  res.send(users);
});

app.listen(3001);
