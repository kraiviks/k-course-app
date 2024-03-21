import { coursesRepository } from "../_repositories/course";

type GetCoursesList = {};

export class GetCoursesListService {
  async exec(data?: GetCoursesList) {
    return coursesRepository.getCoursesList();
  }
}

export const getCoursesListService = new GetCoursesListService();
