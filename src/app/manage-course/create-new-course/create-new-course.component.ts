import { PostResponse } from './../../model/PostResponse';
import { Component, createEnvironmentInjector, ElementRef, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { InsertCreateSectionComponentDirective } from 'src/app/directives/insert-create-section-component.directive';
import { CreateSectionComponent } from 'src/app/reusable-component/create-section/create-section.component';
import { CourseService } from 'src/app/services/course.service';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';

@Component({
  selector: 'create-new-course',
  templateUrl: './create-new-course.component.html',
  styleUrls: ['./create-new-course.component.scss']
})
export class CreateNewCourseComponent {

  // ===================================
  // Custom Directives to dynamically inject components into this component
  // ===================================
  @ViewChild(InsertCreateSectionComponentDirective, {static:false}) insertCreateSectionComponent!: InsertCreateSectionComponentDirective;

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

  // ================================================
  // Root-level course creation form
  // Form Structure:
  //  CreateNewCourseForm
  //  -   CourseChapters  [Should be array]
  //    -     Section [Should be array]
  //
  // ** A course should have multiple chapters that may have multiple sections
  // ================================================
  createNewCourseForm: FormGroup = new FormGroup({
    courseTitle: new FormControl('', Validators.required),
    courseDescription: new FormControl('', Validators.required),
    learningObjectives: new FormControl('', Validators.required),
    topic: new FormControl('', Validators.required),

    // Course Chapters
    courseChapters: new FormArray([
      new FormGroup({
        chapterTitle: new FormControl('', Validators.required),
        chapterNumber: new FormControl(1),
        // To dynamically add sections when user clicks 'Add Section'
        section: new FormArray([

        ])
      })
    ])
  });

  newCourseForm!: any | null;

  constructor(private courseService: CourseService,
    private host: ElementRef<HTMLElement>,
    private errorHandlerService: ErrorHandlerService
  ){}

  ngOnInit(){

    this.createNewCourseForm.valueChanges.subscribe((formData)=>{

      console.log("this.newCourseForm", this.newCourseForm)

      this.newCourseForm = formData;

    });

  }

  ngAfterViewInit(){

    // this.injectCreateSectionComponent();

  }

  // ============================================================
  // This module dynamically inject section component into DOM
  // ============================================================
  injectCreateSectionComponent = () => {

    const sectionForm = this.addSectionFormGroupIntoFormArray();

    var sectionalContainerRef: ViewContainerRef;

    sectionalContainerRef = this.insertCreateSectionComponent.viewContainerRef;

    const createSectionInstance = new CreateSection(CreateSectionComponent,
      {
        parentForm: this.createNewCourseForm,
        childForm: sectionForm,
      });

    const componentRef = sectionalContainerRef.createComponent(createSectionInstance.component);

    componentRef.instance.dataFromParent = createSectionInstance.data;

  }

  // ==========================================================================
  // This module add new Section Form into root-level CreateNewCourseForm
  //
  // Note: Section Form should be initialized within function scope. Otherwise
  // every addition of Section Form will contain the same value as others.
  // =========================================================================
  addSectionFormGroupIntoFormArray = (): FormGroup => {

    // console.log("this.section", this.section);
    const sectionForm: FormGroup = new FormGroup({
      sectionNumber: new FormControl(this.section.length + 1),
      sectionTitle: new FormControl('', Validators.required),
      sectionDescription: new FormControl('', Validators.required),
      sectionOutcome: new FormControl('', Validators.required),
      sectionMultimedia: new FormControl(null, Validators.required),
      _sectionIsSaved: new FormControl(false)
    });

    // =========================================
    // Push sectionForm into section Form Array
    // Form Structure:
    //  CreateNewCourseForm
    //  -   CourseChapters  [Should be array]
    //    -     Section [Should be array]
    // =========================================
    this.section.push(sectionForm);

    return sectionForm;

  }

  // ============================================
  // Invoke course service to commence POST /api/course/new
  // ============================================
  onPublishNewCourse = () => {

    // ===============================================
    // POST New Course Form Data Request subscription
    // ===============================================
    this.courseService.publishCourse(
      {
        ...this.createNewCourseForm.getRawValue()
      }
    )[0].subscribe({

      next: (httpResponse: PostResponse<unknown>) => {

        console.log("[onPublishNewCourse|POST /api/course/new]",httpResponse);

      },
      error: <K>(error: K) => {

        console.log("[onPublishNewCourse|POST /api/course/new]", error);
        this.errorHandlerService.handleError(error);

      }

    });

    // ============================================
    // POST Multimedia Upload Request subscription
    // ============================================
    this.courseService.publishCourse(
      {
        ...this.createNewCourseForm.getRawValue()
      }
    )[1].subscribe({
      next: (httpResponse: PostResponse<unknown>) => {

        console.log("[onPublishNewCourse|POST /api/course/new/upload]",httpResponse);

      },
      error: <K>(error: K) => {

        this.errorHandlerService.handleError(error);

        console.log("[onPublishNewCourse|POST /api/course/new/upload]", error);

      },
      complete: () =>{

      }

    });

  }

  get courseChapters() {
    return this.createNewCourseForm.get('courseChapters') as FormArray;
  }

  get section(){

    // Change 0 to var
    return this.courseChapters.at(this.courseChapters.length - 1).get('section') as FormArray;

  }

}

class CreateSection {
  constructor(public component: Type<any>, public data: any) { }
}
