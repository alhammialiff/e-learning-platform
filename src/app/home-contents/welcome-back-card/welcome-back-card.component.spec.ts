import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeBackCardComponent } from './welcome-back-card.component';

describe('WelcomeBackCardComponent', () => {
  let component: WelcomeBackCardComponent;
  let fixture: ComponentFixture<WelcomeBackCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WelcomeBackCardComponent]
    });
    fixture = TestBed.createComponent(WelcomeBackCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
