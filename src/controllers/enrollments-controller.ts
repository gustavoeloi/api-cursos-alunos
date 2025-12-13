import { knexConnection } from "@/database/knexconfig";
import { Request, Response, NextFunction } from "express";

import { AppError } from "@/utils/AppError";
import z from "zod";

class EnrollmentsController {
  async indexCourse(request: Request, response: Response, next: NextFunction) {
    try {
      const { courseId } = request.params;

      const course = await knexConnection<CourseRepository>("courses")
        .select()
        .where("id", courseId)
        .first();

      if (!course) {
        throw new AppError("The enrollments id does not exists");
      }

      const courses = await knexConnection<StudentRepository>("students")
        .select()
        .join("enrollments", "students.id", "enrollments.student_id")
        .where("enrollments.course_id", courseId);

      return response.json(courses);
    } catch (error) {
      next(error);
    }
  }

  async indexStudent(request: Request, response: Response, next: NextFunction) {
    try {
      const { studentId } = request.params;

      const course = await knexConnection<CourseRepository>("students")
        .select()
        .where("id", studentId)
        .first();

      if (!course) {
        throw new AppError("The student id does not exists");
      }

      const courses = await knexConnection<StudentRepository>("courses")
        .select()
        .join("enrollments", "courses.id", "enrollments.course_id")
        .where("enrollments.student_id", studentId);

      return response.json(courses);
    } catch (error) {
      next(error);
    }
  }

  async create(request: Request, response: Response, next: NextFunction) {
    try {
      const bodySchema = z.object({
        student_id: z.string(),
        course_id: z.string(),
      });

      const { student_id, course_id } = bodySchema.parse(request.body);

      const student = await knexConnection<StudentRepository>("students")
        .select()
        .where("id", student_id);

      if (!student) {
        throw new AppError("the user id doest not exists");
      }

      const course = await knexConnection<StudentRepository>("courses")
        .select()
        .where("id", course_id);

      if (!course) {
        throw new AppError("the coures id does not exists");
      }

      await knexConnection<EnrollmentsRepository>("enrollments").insert({
        student_id,
        course_id,
      });

      return response.status(201).json();
    } catch (error) {
      next(error);
    }
  }
}

export { EnrollmentsController };
