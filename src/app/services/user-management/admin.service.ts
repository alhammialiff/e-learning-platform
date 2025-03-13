import { Injectable } from '@angular/core';
import { CardNav } from 'src/app/model/CardNav';


@Injectable({
  providedIn: 'root'
})
export class AdminService {

  adminLinks: CardNav[] = [
    {
      route: 'user-management',
      title: 'Manage User',
      image: 'manageUser'
    },
    {
      route: 'course-management',
      title: 'Manage Course',
      image: 'manageCourse'
    },
    {
      route: 'reporting-and-analytics',
      title: 'Reporting and Analytics',
      image: 'monitoring'
    }
  ]

  manageCourseLinks: CardNav[] = [
    {
      route: 'enroll',
      title: 'Manage Enrollment',
      image: 'enrollUser'
    },
    {
      route: 'create-new-course',
      title: 'Create New Course',
      image: 'createCourse'
    },
    {
      route: 'edit-course',
      title: 'Edit Course',
      image: 'editCourse'
    },
    {
      route: 'delete-course',
      title: 'Delete Course',
      image: 'deleteCourse'
    }
  ]

  constructor() { }

  getAdminLinks(){
    return this.adminLinks;
  }

  getManageCourseLinks(){
    return this.manageCourseLinks;
  }

}
