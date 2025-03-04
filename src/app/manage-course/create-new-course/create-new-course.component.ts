import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'create-new-course',
  templateUrl: './create-new-course.component.html',
  styleUrls: ['./create-new-course.component.scss']
})
export class CreateNewCourseComponent {

  topics: string[] = [
    'Bus Operations',
    'Fleet Management',
    'Customer Service',
    'Safety',
    'Quality Management',
    'Productivity',
    'Health & Well-being',
    'Leadership',
    'Workplace Relations'
  ]

  createNewCourseForm: FormGroup = new FormGroup({
    courseTitle: new FormControl('', Validators.required),
    courseDescription: new FormControl('', Validators.required),
    learningObjectives: new FormControl('', Validators.required),
    topic: new FormControl('', Validators.required),
    courseSections: new FormArray([
      // ****************************
      // TO-DO AFTER BASIC FORM IS UP
      // ****************************
    ])

  });

  constructor(){}

  ngOnInit(){

    this.createNewCourseForm.valueChanges.subscribe(console.log);

  }

  ngAfterViewInit(){

  }

}
