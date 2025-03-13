import { UserService } from './../../services/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  selector: 'app-manage-enrollment',
  templateUrl: './manage-enrollment.component.html',
  styleUrls: ['./manage-enrollment.component.scss']
})
export class ManageEnrollmentComponent {

  users: any[] = [];

  enrollmentForm: FormGroup = new FormGroup({
    user: new FormControl('Select User', Validators.required),
    course: new FormControl('', Validators.required),
    role: new FormControl('', Validators.required)
  });

  constructor(private userService: UserService){}

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

    this.enrollmentForm.valueChanges.subscribe((formData)=>{

      console.log("Enrollment Form", formData);

    });

  }

  ngOnViewInit(){



  }







}
