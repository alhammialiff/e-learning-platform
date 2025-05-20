import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseCardWebComponent } from './course-card-web.component';

describe('CourseCardWebComponent', () => {
  let component: CourseCardWebComponent;
  let fixture: ComponentFixture<CourseCardWebComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CourseCardWebComponent]
    });
    fixture = TestBed.createComponent(CourseCardWebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
