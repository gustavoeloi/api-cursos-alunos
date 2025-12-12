import { Router } from "express";

import { CourseController } from "@/controllers/courses-controller";

const coursesRoutes = Router();
const courseController = new CourseController();

coursesRoutes.get("/", courseController.index);
coursesRoutes.post("/", courseController.create);
coursesRoutes.patch("/:id", courseController.update);
coursesRoutes.delete("/:id", courseController.remove);

export { coursesRoutes };
