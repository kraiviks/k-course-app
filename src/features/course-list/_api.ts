import { createApi, createHttpApi } from "@/kernel/lib/trpc/client";
import { CourseListController } from "./_controller";

export const courseListApi = createApi<CourseListController["router"]>();

export const courseListHttpApi =
  createHttpApi<CourseListController["router"]>();
