import { Course } from "./Course";
import { CourseEnrollment } from "./CourseEnrollment";

export interface PostResponse<Data> {
  response: string;
  data?: Data;
  message: string;
  timestamp: string;
}

export type PostResponseGetAllCourses = PostResponse<Course>;
// export type PostResponseGet