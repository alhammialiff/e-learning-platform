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
      image: 'group'
    },
    {
      route: 'course-management',
      title: 'Manage Course',
      image: 'menu_book'
    },
    {
      route: 'reporting-and-analytics',
      title: 'Reporting and Analytics',
      image: 'monitoring'
    }
  ]

  manageCourseLinks: CardNav[] = [
    {
      route: 'create-new-course',
      title: 'Create New Course',
      image: 'create-new-course.png'
    },
    {
      route: 'edit-course',
      title: 'Edit Course',
      image: 'edit-course.png'
    },
    {
      route: 'delete-course',
      title: 'Delete Course',
      image: 'delete-course.png'
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
