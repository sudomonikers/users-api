require("dotenv").config();
import express from "express";
import Logger from "./logger";
import router from "./secure/secure.routes";
import cors from "cors";

const app = express();
app.use(
  cors({
    origin: "*",
    methods: ["GET", "PUT", "DELETE"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", router);

// start the Express server
export const server = app.listen(process.env.PORT, () => {
  Logger.info(
    `Server is up and running @ http://localhost:${process.env.PORT}`
  );
});
