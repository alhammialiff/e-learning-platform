import { Component, createEnvironmentInjector, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { InsertCreateSectionComponentDirective } from 'src/app/directives/insert-create-section-component.directive';
import { CreateSectionComponent } from 'src/app/reusable-component/create-section/create-section.component';

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

        // To dynamically add sections when user clicks 'Add Section'
        section: new FormArray([

        ])
      })
    ])
  });

  constructor(){}

  ngOnInit(){

    this.createNewCourseForm.valueChanges.subscribe(console.log);

  }

  ngAfterViewInit(){

    // this.injectCreateSectionComponent();

  }

  // ============================================================
  // This module dynamically inject section component into DOM
  // ============================================================
  injectCreateSectionComponent(){

    const sectionForm = this.addSectionFormGroupIntoFormArray();

    var sectionalContainerRef: ViewContainerRef;

    sectionalContainerRef = this.insertCreateSectionComponent.viewContainerRef;

    const createSectionInstance = new CreateSection(CreateSectionComponent, {parentForm: this.createNewCourseForm, childForm: sectionForm});

    const componentRef = sectionalContainerRef.createComponent(createSectionInstance.component);

    componentRef.instance.dataFromParent = createSectionInstance.data;

  }

  // ==========================================================================
  // This module add new Section Form into root-level CreateNewCourseForm
  //
  // Note: Section Form should be initialized within function scope. Otherwise
  // every addition of Section Form will contain the same value as others.
  // =========================================================================
  addSectionFormGroupIntoFormArray(): FormGroup{

    // console.log("this.section", this.section);
    const sectionForm: FormGroup = new FormGroup({
      sectionTitle: new FormControl('', Validators.required),
      sectionDescription: new FormControl('', Validators.required),
      sectionOutcome: new FormControl('', Validators.required),
      sectionContent: new FormControl('', Validators.required)
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
