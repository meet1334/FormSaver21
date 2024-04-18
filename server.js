const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const cors = require("cors");
const path = require("path");
const connectDB = require("./src/db/connect");

// ==================== Bodyparsers==============================

app.use(express.json());
app.use(express.urlencoded());

//===================== ROUTES ===================================
const authRouter = require("./src/routes/auth");
const adminUserRouter = require("./src/routes/adminUser");
app.get("/", (req, res) => {
  res.send("hi,i am live");
});
app.use("/api", authRouter.router);
app.use("/api/adminuser", adminUserRouter.router);

//================================================================

const port = process.env.PORT ?? 8080;
const public_dir = process.env.PUBLIC_DIR ?? "public";

//=============  LISTEN SERVER =============================

const start = async (req, res) => {
  try {
    await connectDB(process.env.MONGODB_URI);
    console.log(
      "=================== Database Connect to MongoDB ================> "
    );
    app.listen(port, () => {
      console.log(
        `================== Server listening on ${port} =================> `
      );
    });
  } catch (error) {
    console.log(error);
  }
};

start();
