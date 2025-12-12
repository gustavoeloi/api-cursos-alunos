import { Request, Response, NextFunction } from "express";

import { knexConnection } from "@/database/knexconfig";
import z from "zod";
import { AppError } from "@/utils/AppError";

class CourseController {
  async index(request: Request, response: Response, next: NextFunction) {
    try {
      const courses = await knexConnection<CourseRepository>(
        "courses"
      ).select();

      return response.json(courses);
    } catch (error) {
      next(error);
    }
  }

  async create(request: Request, response: Response, next: NextFunction) {
    try {
      const bodySchema = z.object({
        name: z.string().trim().min(6),
        description: z.string().min(10),
      });

      const { name, description } = bodySchema.parse(request.body);

      await knexConnection<CourseRepository>("courses").insert({
        name,
        description,
      });

      return response.status(201).json();
    } catch (error) {
      next(error);
    }
  }

  async update(request: Request, response: Response, next: NextFunction) {
    try {
      const { id } = request.params;

      const bodySchema = z.object({
        name: z.string().trim().min(6).optional(),
        description: z.string().min(10).optional(),
      });

      const { name, description } = bodySchema.parse(request.body);

      const course = await knexConnection<CourseRepository>("courses")
        .select()
        .where("id", id);

      if (!course) {
        throw new AppError("this course id does not exist");
      }

      if (name) {
        const course = await knexConnection<CourseRepository>("courses")
          .select()
          .where("name", name)
          .first();

        if (course) {
          throw new AppError(
            "This course name has been already used! Provide a name that is not used yet."
          );
        }
      }

      await knexConnection<CourseRepository>("courses")
        .update({ name, description, updated_at: knexConnection.fn.now() })
        .where("id", id);

      return response.status(204).json();
    } catch (error) {
      next(error);
    }
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    try {
      const { id } = request.params;

      const course = await knexConnection<CourseRepository>("courses")
        .select()
        .where("id", id)
        .first();

      if (!course) {
        throw new AppError("the course id doest not exists");
      }

      await knexConnection<CourseRepository>("courses").where("id", id).del();

      return response.status(204).json();
    } catch (error) {
      next(error);
    }
  }
}

export { CourseController };
