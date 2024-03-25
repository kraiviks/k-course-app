import { CourseListClient } from "./_ui/course-list";
import { courseListHttpApi } from "./_api";

export async function CourseList() {
  const courseList = await courseListHttpApi.courseList.get.query();

  return <CourseListClient defaultList={courseList} />;
}
