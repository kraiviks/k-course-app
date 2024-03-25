import { CourseEntityModule } from "@/entities/course/server";
import { CourseListModule } from "@/features/course-list/sever";
import { Container } from "inversify";

export function init() {
  const container = new Container();

  container.load(CourseListModule, CourseEntityModule);

  return container;
}
