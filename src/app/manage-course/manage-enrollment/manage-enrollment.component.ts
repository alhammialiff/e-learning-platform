import { UserService } from './../../services/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-manage-enrollment',
  templateUrl: './manage-enrollment.component.html',
  styleUrls: ['./manage-enrollment.component.scss']
})
export class ManageEnrollmentComponent {

  users: any[] = [];
  courses: any[] = [];

  enrollmentForm: FormGroup = new FormGroup({
    user: new FormControl('Select User', Validators.required),
    course: new FormControl('', Validators.required),
    role: new FormControl('', Validators.required)
  });

  constructor(private userService: UserService,
    private courseService: CourseService
  ){}

  ngOnInit(){

    // Get User list
    this.userService.getAllUsers().subscribe(
      {
        next: (response: any) => {

          this.users = response?.data;
          console.log("[Success] Get All Users", response);


        },
        error: (error: any) => {

          console.error(error);

        },
        complete: () =>{


        }
      }
    );

    // Get course list
    this.courseService.getAllCourses_SuperUser().subscribe(
      {
        next: (response: any) => {

          this.courses = response?.data;
          console.log("[Success] Get All Courses", response);


        },
        error: (error: any) => {

          console.error(error);

        },
        complete: () =>{


        }
      }
    );

    this.enrollmentForm.valueChanges.subscribe((formData)=>{

      console.log("Enrollment Form", formData);

    });

  }

  ngOnViewInit(){



  }







}
