import { PostResponse } from './../../model/PostResponse';
import { Component, createEnvironmentInjector, ElementRef, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { ControlValueAccessor, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { map, tap } from 'rxjs';
import { InsertCreateSectionComponentDirective } from 'src/app/directives/insert-create-section-component.directive';
import { CreateSectionComponent } from 'src/app/reusable-component/create-section/create-section.component';
import { CourseService } from 'src/app/services/course.service';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';

@Component({
  selector: 'create-new-course',
  templateUrl: './create-new-course.component.html',
  styleUrls: ['./create-new-course.component.scss']
})
export class CreateNewCourseComponent implements ControlValueAccessor{

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
    courseCoverImage: new FormControl('', Validators.required),

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

  courseCoverImagePath: string | null = '';

  newCourseForm!: any | null;

  constructor(private courseService: CourseService,
    private host: ElementRef<HTMLElement>,
    private errorHandlerService: ErrorHandlerService
  ){}

  ngOnInit(){

    this.createNewCourseForm
      .valueChanges
      .pipe(
        tap(()=>{
          return this.createNewCourseForm.getRawValue();
        })
      )
      .subscribe((formData)=>{


        this.newCourseForm = formData;
        console.log("this.newCourseForm", this.newCourseForm)

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

  // Custom Upload Methods required by CVA
  onChange = (value: any) => {};
  onTouched = () => {};

  writeValue(value: any): void {
    this.courseCoverImagePath = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    // Optional: handle disabled state
  }

  onInput(event: Event): void{
    event.preventDefault();

    var imageFile: File | null = null;
    var imageFilePath: string | null = '';

    // If upload is dragged over
    if ((event as DragEvent).dataTransfer?.files) {

      imageFile = (event as DragEvent).dataTransfer?.files[0] ?? null;
      imageFilePath = imageFile ? imageFile.name : null;

    // Otherwise, click upload is fired
    }else{

      var input = event.target as HTMLInputElement;

      imageFile = input.files? input.files[0] : null;
      imageFilePath = imageFile ? imageFile.name : null;

    }

    // Set value of file path to form control
    this.createNewCourseForm.patchValue({
      courseCoverImage: imageFilePath
    });

    // TODO - Save file in a service

  }

  onDragOver(event: Event): void {

    event?.preventDefault();


  }

}

class CreateSection {
  constructor(public component: Type<any>, public data: any) { }
}
