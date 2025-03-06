import { Component, Input } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-section',
  templateUrl: './create-section.component.html',
  styleUrls: ['./create-section.component.scss']
})
export class CreateSectionComponent {

  // Retrieving FormGroup data from parent (Create New Course Component)
  @Input() dataFromParent!: any;

  createNewCourseForm!: FormGroup;
  sectionForm!: FormGroup;

  constructor(){

  }

  ngOnInit(){

    console.log('dataFromParent', this.dataFromParent);

    // Extract parentForm passed from Create New Course Component
    // To be used as parent [formGroup] in template
    this.createNewCourseForm = this.dataFromParent.parentForm;

    // Extract childForm passed from Create New Course Component
    // To be used as child [formGroup] in template
    this.sectionForm = this.dataFromParent.childForm;

    console.log('createNewCourseForm', this.createNewCourseForm);

  }

  ngAfterViewInit(){



  }

  // Function to process file upload (may need service for this)

}
