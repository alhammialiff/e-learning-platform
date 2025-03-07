import { Component, ElementRef, Input } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { findIndex } from 'rxjs';
import { CourseService } from 'src/app/services/course.service';

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
  sectionMultimedia!: File;
  createNewCourseFormData!: any;
  chapterNumber: any;
  sectionNumber: number = 0;
  formToSend: any;

  constructor(private courseService: CourseService,
    private host: ElementRef<HTMLElement>
  ){}

  ngOnInit(){

    console.log('dataFromParent', this.dataFromParent);

    // Extract parentForm passed from Create New Course Component
    // To be used as parent [formGroup] in template
    this.createNewCourseForm = this.dataFromParent.parentForm;

    // Extract childForm passed from Create New Course Component
    // To be used as child [formGroup] in template
    this.sectionForm = this.dataFromParent.childForm;

    const courseChapterLength = this.createNewCourseForm.get('courseChapters')?.value.length;
    this.chapterNumber = this.createNewCourseForm.get('courseChapters')?.value[courseChapterLength - 1].chapterNumber;
    this.sectionNumber = this.sectionForm.get('sectionNumber')?.value;

    console.log('createNewCourseForm', this.createNewCourseForm);

    this.createNewCourseForm.valueChanges.subscribe((data)=>{

      this.createNewCourseFormData = data;

    });

  }

  ngAfterViewInit(){



  }

  ngOnDestroy(){

  }

  // ============================================================
  // Function to process file upload
  // ============================================================
  onFileSelected = (event: any) => {

    this.sectionMultimedia = event.target.files[0];

  }


  //================================================================
  // Save section data by -:
  // (1) Appending multimedia file into section form data
  // (2) Pushing appended section data to arrayOfReappendedSections
  //================================================================
  saveSection = () => {

    this.formToSend = {...this.createNewCourseForm.getRawValue()};

    const sectionMultimedia = this.formToSend.courseChapters[this.chapterNumber - 1].section[this.sectionNumber - 1].sectionMultimedia;

    if(sectionMultimedia !== null || sectionMultimedia !== undefined){

      // Append mutable form to include actual multimedia file, chapter number and section number
      this.formToSend.courseChapters[this.chapterNumber - 1].section[this.sectionNumber - 1].sectionMultimedia =
      {
        file: this.sectionMultimedia,
        chapterNumber: this.chapterNumber,
        sectionNumber: this.sectionNumber
      }

    }else{

      this.formToSend.courseChapters[this.chapterNumber - 1].section[this.sectionNumber - 1].sectionMultimedia = null;

    }

    // Push section data to arrayOfReappendedSections in Course Service
    // This data, reappended with multimedia file, will then be restitched with the form data before performing POST request
    this.courseService.pushToSectionMultimedia(this.formToSend.courseChapters[this.chapterNumber - 1].section[this.sectionNumber - 1]);

    console.log('sectionContentMultimedia', this.sectionMultimedia);
    console.log('createNewCourseFormData', this.createNewCourseForm.getRawValue());
    console.log('this.formToSend', this.formToSend);
    console.log('chapterNumber', this.chapterNumber);
    console.log('sectionNumber', this.sectionNumber);

  }

  // =================================================
  // Remove Section Form Array Data from Form Group
  // Removes -:
  // (1) Section data from Form Group Data
  // (2) Reappended section data from Course Service arrayOfReappendedSections
  // (3) UI data from DOM
  // =================================================
  removeSection = () => {

    // Condense this long code chain into var (Getting access to Section Form Array)
    const sectionFormArray = ((this.createNewCourseForm.get('courseChapters') as FormArray).controls[this.chapterNumber - 1].get('section') as FormArray);

    // Find Index
    const index = sectionFormArray.controls.findIndex(
      (control) => {
        return control.get('sectionNumber')?.value === this.sectionNumber;
      }
    );

    // Remove current section from form group
    sectionFormArray.removeAt(index);

    console.log((this.createNewCourseForm.get('courseChapters') as FormArray).controls[this.chapterNumber - 1].get('section') as FormArray);

    // Remove section data from arrayOfReappendedSections (we don't want the removed section to be published on POST request)
    this.courseService.removeFromSectionMultimediaByKeyValuePair(this.formToSend.courseChapters[this.chapterNumber - 1].section[this.sectionNumber - 1]);

    this.host.nativeElement.remove();

  }



}

// ================================================================================================================
// TO-DO
// (1) Continue working on form data massage
//   - On submit, course service should reappend multimedia file into createNewCourse Form's section Form Array
//   - To continue verify workflow by massaging data at the backend
//         - Section Form Array goes into section table
//         - Course Form Array goes into course table
//         - Chapter Form Array goes into chapter table (to make chapter creation dynamic)
//         - Only share with the schema, data massage technique at backend when first db signal test is successful
//   - To remember to dev dynamic chapter creation after demo
//   - To test test test
// ================================================================================================================
