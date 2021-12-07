require("dotenv").config();
import express from "express";
import Logger from "./logger";
import router from "./secure/secure.routes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", router);

// start the Express server
export const server = app.listen(process.env.PORT, () => {
  Logger.info(
    `Server is up and running @ http://localhost:${process.env.PORT}`
  );
});
