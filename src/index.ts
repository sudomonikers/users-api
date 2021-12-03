import express from "express";
import Logger from "./logger";

const app = express();
const port = 8080; // default port to listen

// define a route handler for the default home page
app.get("/", (req, res) => {
  res.send("Hello world!");
});

// start the Express server
app.listen(port, () => {
  Logger.debug(`Server is up and running @ http://localhost:${port}`);
});
