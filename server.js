const express = require("express");

const mongoose = require("mongoose");

const dotenv = require("dotenv");

const cors = require("cors");

const path = require("path");

const next = require("next");

dotenv.config({ path: path.join(__dirname, "config", "config.env") });

const dev = process.env.NODE_ENV !== "production";

const app = next({ dev });

const handle = app.getRequestHandler();

mongoose
  .connect(process.env.MONGO_URI, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connected..."))
  .catch((err) => console.log(err));

app.prepare().then(() => {
  const server = express();

  server.use(
    cors({
      credentials: true,
      origin: "*",
      optionsSuccessStatus: 200,
    })
  );

  server.use(express.json({ extended: false }));

  server.use("/api/user", require("./routes/user"));

  server.all("*", (req, res) => {
    return handle(req, res);
  });

  const PORT = process.env.PORT || 3000;
  server.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
  });
});
