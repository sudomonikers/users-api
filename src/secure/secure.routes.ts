import express from "express";
import Logger from "../logger";
import * as routeFunctions from "./secure.routes.functions";

const router = express.Router();

// Global middleware

// Routes
// Get
router.get("/", (req, res) => {
  res.status(200).json({ message: "Connected!" });
});

router.get("/toDos", async (req, res) => {
  const toDos = await routeFunctions.getToDos();
  Logger.debug(toDos);
  res.json(toDos);
});

// Put
router.put("/toDos", async (req, res) => {
  Logger.debug(req.body);

  const response = await routeFunctions.putToDos(req.body.toDo);
  Logger.debug(response);
  res.json(response);
});

// Delete

export default router;
