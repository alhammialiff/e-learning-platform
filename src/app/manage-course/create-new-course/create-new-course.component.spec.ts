import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewCourseComponent } from './create-new-course.component';

describe('AddNewCourseComponent', () => {
  let component: CreateNewCourseComponent;
  let fixture: ComponentFixture<CreateNewCourseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateNewCourseComponent]
    });
    fixture = TestBed.createComponent(CreateNewCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
