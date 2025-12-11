import { Router } from "express";
import { StudentController } from "@/controllers/students-controller";

const studentRoutes = Router();
const studentController = new StudentController();

studentRoutes.get("/", studentController.index);
studentRoutes.post("/", studentController.create);
studentRoutes.patch("/:id", studentController.update);
studentRoutes.delete("/:id", studentController.remove);

export { studentRoutes };
