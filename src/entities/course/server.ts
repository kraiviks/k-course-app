import { ContainerModule } from "inversify";
import { GetCourseListService } from "./_services/get-course-list";
import { CoursesRepository } from "./_repositories/course";

export const CourseEntityModule = new ContainerModule((bind) => {
  bind(GetCourseListService).toSelf();
  bind(CoursesRepository).toSelf();
});

export { GetCourseListService };
