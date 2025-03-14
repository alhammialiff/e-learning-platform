import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopNavComponent } from './top-nav/top-nav.component';
import { MobileNavTabComponent } from './mobile-nav-tab/mobile-nav-tab.component';
import { HomeContentsComponent } from './home-contents/home-contents.component';
import { CardComponent } from './reusable-component/card/card.component';
import { HttpClientModule } from '@angular/common/http';
import { WelcomeBackCardComponent } from './home-contents/welcome-back-card/welcome-back-card.component';
import { ManageCourseComponent } from './manage-course/manage-course.component';
import { CreateNewCourseComponent } from './manage-course/create-new-course/create-new-course.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InsertCreateSectionComponentDirective } from './directives/insert-create-section-component.directive';
import { CreateSectionComponent } from './reusable-component/create-section/create-section.component';
import { ManageEnrollmentComponent } from './manage-course/manage-enrollment/manage-enrollment.component';
import { SearchContainerComponent } from './custom-form/search-container/search-container.component';

@NgModule({
  declarations: [
    AppComponent,
    TopNavComponent,
    MobileNavTabComponent,
    HomeContentsComponent,
    CardComponent,
    WelcomeBackCardComponent,
    CreateNewCourseComponent,
    ManageCourseComponent,
    InsertCreateSectionComponentDirective,
    CreateSectionComponent,
    ManageEnrollmentComponent,
    SearchContainerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
