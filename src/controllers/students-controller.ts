import { Request, Response, NextFunction } from "express";

import { knex } from "@/database/knexconfig";

class StudentController {
  async index(request: Request, response: Response, next: NextFunction) {
    try {
      const students = await knex<StudentRepository>("students")
        .select()
        .orderBy("name", "asc");

      return response.json(students);
    } catch (error) {
      next(error);
    }
  }
}

export { StudentController };
