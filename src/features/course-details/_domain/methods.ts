import { Course, getIsCourseInDraft, Lesson } from "@/entities/course";
import { CourseAction } from "./types";

export async function getCourseAction({
  course,
  lessons,
  hasAccess,
}: {
  course: Course;
  lessons: Lesson[];
  hasAccess?: boolean;
}): Promise<CourseAction> {
  if (!hasAccess && course.product.access === "paid") {
    return {
      type: "buy",
      price: course.product.price,
    };
  }

  // If there is no lesson, it's probably a demo course
  if (!getIsCourseInDraft(lessons)) {
    return {
      type: "comming-soon",
    };
  }

  // If there is no progress, then the lesson has not yet begun
  return {
    type: "enter",
    targetLesson: {
      courseSlug: course.slug,
      lessonSlug: lessons[0]?.slug,
    },
  };
}
