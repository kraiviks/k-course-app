import { GetCourseListService } from "@/entities/course/server";
import { publicProcedure, router, Controller } from "@/kernel/lib/trpc/server";
import { compileMDX } from "@/shared/lib/mdx/server";
import { injectable } from "inversify";

@injectable()
export class CourseListController extends Controller {
  constructor(private getCourseListService: GetCourseListService) {
    super();
  }

  public router = router({
    courseList: router({
      get: publicProcedure.query(async () => {
        const courseList = await this.getCourseListService.exec();

        const compiledCourses = await Promise.all(
          courseList.map(async (course) => ({
            ...course,
            description: await compileMDX(course.description).then(
              (r) => r.code,
            ),
          })),
        );

        return compiledCourses;
      }),
    }),
  });
}
