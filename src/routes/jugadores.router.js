import express from "express";
import { jugadoresController } from "../controllers/jugadores.controller.js";
import { checkAdmin, uploadPicture } from "../middlewares/main.js";

export const jugadoresRouter = express.Router();

//atajo los request con su verbo, paso por los middlewares si es necesario y paso el trabajo al controller
jugadoresRouter.get("/", jugadoresController.getAll);
jugadoresRouter.post(
  "/",
  checkAdmin,
  uploadPicture,
  jugadoresController.createOne
);
// jugadoresRouter.put('/', checkAdmin, async (req, res) => {});
// jugadoresRouter.delete('/', checkAdmin, async (req, res) => {});
