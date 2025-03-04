import { CourseService } from './../services/course.service';
import { Component } from '@angular/core';
import { Course } from '../model/Course';
import { CardNav } from '../model/CardNav';
import { AdminService } from '../services/user-management/admin.service';

@Component({
  selector: 'app-home-contents',
  templateUrl: './home-contents.component.html',
  styleUrls: ['./home-contents.component.scss']
})
export class HomeContentsComponent {

  // Courses that are available to User
  courses!: Course[];

  adminLinks: CardNav[] | null = null;

  constructor(private courseService: CourseService,
    private adminService: AdminService
  ){}

  ngOnInit(){

    this.adminLinks = this.adminService.getAdminLinks();

    this.courseService.getAllCoursesByUserID().subscribe({
      next: (response) => {

        console.log("[Success] Get All Courses By User ID", response);
        this.courses = response?.data;

      },
      error: (error) => {

        console.error(error);

      }

    })

  }

  ngAfterViewInit(){

  }

}
