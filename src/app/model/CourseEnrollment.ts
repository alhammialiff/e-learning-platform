import { User } from "./User";

export interface CourseEnrollment {
  course: string;
  users: User<'id'|'name'>[];
  userSearchInput?: string;
}
