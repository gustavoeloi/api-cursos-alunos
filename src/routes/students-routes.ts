import { Router } from "express";
import { StudentController } from "@/controllers/students-controller";

const studentRoutes = Router();
const studentController = new StudentController();

studentRoutes.use("/", studentController.index);

export { studentRoutes };
