import { CourseService } from './../services/course.service';
import { Component } from '@angular/core';
import { Course } from '../model/course';

@Component({
  selector: 'app-home-contents',
  templateUrl: './home-contents.component.html',
  styleUrls: ['./home-contents.component.scss']
})
export class HomeContentsComponent {

  // Courses that are available to User
  courses!: Course[];

  constructor(private courseService: CourseService){}

  ngOnInit(){

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
