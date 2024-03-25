import { CoursesRepository } from "../_repositories/course";
import { injectable } from "inversify";

@injectable()
export class GetCourseListService {
  constructor(private coursesRepository: CoursesRepository) {}
  async exec() {
    return this.coursesRepository.getCourseList();
  }
}
