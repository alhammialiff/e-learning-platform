import { ErrorHandlerService } from './../../services/error-handler.service';
import { UserService } from './../../services/user.service';
import { ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';
import { EnrollService } from 'src/app/services/enroll.service';
import { PostResponse } from 'src/app/model/PostResponse';
import { User } from 'src/app/model/User';
import { Course } from 'src/app/model/Course';

@Component({
  selector: 'app-manage-enrollment',
  templateUrl: './manage-enrollment.component.html',
  styleUrls: ['./manage-enrollment.component.scss'],
})
export class ManageEnrollmentComponent{

  users: User<'name' | 'id'>[] | null = null;
  courses: Course[] = [];

  dataToChild: {
    formGroup: FormGroup | null;
    users: User<'name' | 'id'>[] | null;
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
    private enrollService: EnrollService,
    private errorHandlerService: ErrorHandlerService,
  ){}

  ngOnInit(){

    // Get User list
    this.userService.getAllUsers().subscribe(
      {
        next: (response: unknown) => {

          const resp = response as PostResponse<User<'name' | 'id'>[] | null>;
          this.users = resp.data as User<'name' | 'id'>[] | null;

          console.log("[Success] Get All Users", response);

          this.dataToChild = {
            formGroup: this.enrollmentForm,
            users: this.users
          }

        },
        error: <K>(error: K) => {

          this.errorHandlerService.handleError(error);

        }
      }
    );

    // Get course list
    this.courseService.getAllCourses_SuperUser().subscribe(
      {
        next: (response: unknown) => {

          const resp = response as PostResponse<Course[] | null>;
          this.courses = resp.data as Course[];

          console.log("[Success] Get All Courses", response);

        },
        error: <K>(error: K) => {

          this.errorHandlerService.handleError(error);

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
        next: (response: unknown) => {

          console.log("[Success] Enroll User", response);
          alert("User Enrolled Successfully");

        },
        error: <K>(error: K) => {

          this.errorHandlerService.handleError(error);

        }
      }
    );
  }

}
