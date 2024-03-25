"use client";
import { CourseEntity } from "@/entities/course/course";
import { CourseItem } from "./course-item";
import { courseListApi } from "../_api";

export function CourseListClient({
  defaultList,
}: {
  defaultList: CourseEntity[];
}) {
  const { data: courseList } = courseListApi.courseList.get.useQuery(
    undefined,
    {
      initialData: defaultList,
    },
  );

  return (
    <div className="flex flex-col gap-3">
      {courseList.map((course) => (
        <CourseItem key={course.id} course={course} />
      ))}
    </div>
  );
}
