import { UserService } from './../../services/user.service';
import { ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';
import { EnrollService } from 'src/app/services/enroll.service';

@Component({
  selector: 'app-manage-enrollment',
  templateUrl: './manage-enrollment.component.html',
  styleUrls: ['./manage-enrollment.component.scss'],
})
export class ManageEnrollmentComponent{

  users: any[] = [];
  courses: any[] = [];

  dataToChild: {
    formGroup: FormGroup | null;
    users: any[];
  } = {
    formGroup: null,
    users: []
  }

  enrollmentForm: FormGroup = new FormGroup({
    users: new FormControl([''], Validators.required),
    userSearchInput: new FormControl('', Validators.required),
    course: new FormControl('', Validators.required),

    // ==================
    // Save for later dev
    // ==================
    // role: new FormControl('', Validators.required)

  });

  constructor(private userService: UserService,
    private courseService: CourseService,
    private enrollService: EnrollService
  ){}

  ngOnInit(){

    // Get User list
    this.userService.getAllUsers().subscribe(
      {
        next: (response: any) => {

          this.users = response?.data;
          console.log("[Success] Get All Users", response);

          this.dataToChild = {
            formGroup: this.enrollmentForm,
            users: this.users
          }


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

  ngAfterViewInit(){



  }

  onClickEnroll = () => {

    this.enrollService.enrollUserToCourse(this.enrollmentForm.getRawValue()).subscribe(
      {
        next: (response: any) => {

          console.log("[Success] Enroll User", response);
          alert("User Enrolled Successfully");

        },
        error: (error: any) => {


        },
        complete: () =>{


        }
      }
    );
  }

}
