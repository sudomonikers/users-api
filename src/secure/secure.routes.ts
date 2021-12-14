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
  res.json(toDos);
});

router.get("/toDos/:user", async (req, res) => {
  const toDos = await routeFunctions.getToDosForUser(req.params.user);
  res.json(toDos);
});

// Put
router.put("/toDos/:user", async (req, res) => {
  const response = await routeFunctions.putToDos(req.params.user, req.body);
  res.json(response);
});

// Delete
router.delete("/toDos/:user/:id", async (req, res) => {
  const response = await routeFunctions.delToDo(req.params.user, req.params.id);
  res.json(response);
});

export default router;
