import { Router } from "express";
import { EnrollmentsController } from "@/controllers/enrollments-controller";

const enrollmentsRoute = Router();
const enrollmentsController = new EnrollmentsController();

enrollmentsRoute.get("/course/:courseId", enrollmentsController.indexCourse);
enrollmentsRoute.get("/student/:studentId", enrollmentsController.indexStudent);
enrollmentsRoute.post("/", enrollmentsController.create);

export { enrollmentsRoute };
