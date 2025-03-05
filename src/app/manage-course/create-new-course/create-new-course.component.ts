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

  // courseChapters = new FormGroup({
  //     chapterTitle: new FormControl('', Validators.required)
  // })

  createNewCourseForm: FormGroup = new FormGroup({
    courseTitle: new FormControl('', Validators.required),
    courseDescription: new FormControl('', Validators.required),
    learningObjectives: new FormControl('', Validators.required),
    topic: new FormControl('', Validators.required),
    courseChapters: new FormArray([
      new FormGroup({
        chapterTitle: new FormControl('', Validators.required)
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

  injectCreateSectionComponent(){

    var sectionalContainerRef: ViewContainerRef;

    sectionalContainerRef = this.insertCreateSectionComponent.viewContainerRef;

    const createSectionInstance = new CreateSection(CreateSectionComponent, {data: 'test'});

    const componentRef = sectionalContainerRef.createComponent(createSectionInstance.component);


  }

  get courseChapters() {
    return this.createNewCourseForm.get('courseChapters') as FormArray;
  }

}

class CreateSection {
  constructor(public component: Type<any>, public data: any) { }
}
