import { Component, Input, ChangeDetectorRef } from '@angular/core';
import { Course } from 'src/app/model/Course';

@Component({
  selector: 'app-course-card-web',
  templateUrl: './course-card-web.component.html',
  styleUrls: ['./course-card-web.component.scss']
})
export class CourseCardWebComponent {

  @Input() courseContent!: Course[];

  courseCard: Course = {
    id: null,
    name: null,
    description: null,
    topic: null,
    image: null,
    duration: null
  };

  dirPath: string = `assets/image/`;
  imagePathList: string[] = [];

  constructor(private changeDetectorRef: ChangeDetectorRef){}

  ngOnInit(){

    // Iterate course content to check if it is Course
    this.courseContent?.forEach((course:unknown)=>{

      if(this.isCourse(course)){

        const imagePath = this.dirPath + course.image;

        // Bug here [21/05] - To fix it next sesh
        this.imagePathList.push(imagePath);

      }

    });


  }

  isCourse = (object: unknown): object is Course => {

    let maybeCourse = object as Course;

    return maybeCourse
      && typeof maybeCourse.id === "number"
      && typeof maybeCourse.topic === "string";

  }

}
