import { Request, Response, NextFunction } from "express";

import { knexConnection } from "@/database/knexconfig";

import { z } from "zod";
import { AppError } from "@/utils/AppError";

class StudentController {
  async index(request: Request, response: Response, next: NextFunction) {
    try {
      const students = await knexConnection<StudentRepository>("students")
        .select()
        .orderBy("name", "asc");

      return response.json(students);
    } catch (error) {
      next(error);
    }
  }

  async create(request: Request, response: Response, next: NextFunction) {
    try {
      const studentSchema = z.object({
        name: z.string().trim().min(6),
        email: z.string().email(),
      });

      const { name, email } = studentSchema.parse(request.body);

      const student = await knexConnection<StudentRepository>("students")
        .where({
          email,
        })
        .first();

      if (student) {
        throw new AppError("the email has already been used");
      }

      await knexConnection<StudentRepository>("students").insert({
        name,
        email,
      });

      return response.status(201).json();
    } catch (error) {
      next(error);
    }
  }

  async update(request: Request, response: Response, next: NextFunction) {
    try {
      const { id } = request.params;

      const studentSchema = z.object({
        name: z.string().trim().min(6).optional(),
        email: z.string().email().optional(),
      });

      const { name, email } = studentSchema.parse(request.body);

      const student = await knexConnection<StudentRepository>("students")
        .select()
        .where("id", id)
        .first();

      if (!student) {
        throw new AppError("the student id does not exist.");
      }

      if (email) {
        const student = await knexConnection<StudentRepository>("students")
          .select()
          .where("email", email)
          .first();

        if (student?.email == email) {
          throw new AppError("the email has already been used");
        }
      }

      await knexConnection<StudentRepository>("students")
        .where("id", id)
        .update({ name, email });

      return response.json();
    } catch (error) {
      next(error);
    }
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    try {
      const { id } = request.params;

      const student = await knexConnection<StudentRepository>(
        "students"
      ).select();

      if (!student) {
        throw new AppError("the student id does not exists");
      }

      await knexConnection<StudentRepository>("students").where("id", id).del();

      return response.status(204).json();
    } catch (error) {
      next(error);
    }
  }
}

export { StudentController };
