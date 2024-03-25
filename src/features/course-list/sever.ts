import { ContainerModule } from "inversify";
import { CourseListController } from "./_controller";
import { Controller } from "@/kernel/lib/trpc/server";

export const CourseListModule = new ContainerModule((bind) => {
  bind(Controller).to(CourseListController);
});

export { CourseListController };
