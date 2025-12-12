import { Router } from "express";
import { studentRoutes } from "./students-routes";
import { coursesRoutes } from "./courses-routes";
import { enrollmentsRoute } from "./enrollments-routes";

const routes = Router();

routes.use("/students", studentRoutes);
routes.use("/courses", coursesRoutes);
routes.use("/enrollments", enrollmentsRoute);

export { routes };
