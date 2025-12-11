import { Router } from "express";
import { studentRoutes } from "./students-routes";

const routes = Router();

routes.use("/students", studentRoutes);

export { routes };
