import { Course } from "./Course";

export interface PostResponse<K> {
  status: number;
  data?: K;
  message: string;
  timestamp: string;
}

export type PostResponseGetAllCourses = PostResponse<Course>;
// export type PostResponseGet