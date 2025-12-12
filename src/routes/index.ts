import { Router } from "express";
import { studentRoutes } from "./students-routes";
import { coursesRoutes } from "./courses-routes";

const routes = Router();

routes.use("/students", studentRoutes);
routes.use("/courses", coursesRoutes);

export { routes };
