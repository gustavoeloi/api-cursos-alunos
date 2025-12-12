import { Router } from "express";
import { EnrollmentsController } from "@/controllers/enrollments-controller";

const enrollmentsRoute = Router();
const enrollmentsController = new EnrollmentsController();

enrollmentsRoute.get("/:courseId", enrollmentsController.index);
enrollmentsRoute.post("/", enrollmentsController.create);

export { enrollmentsRoute };
