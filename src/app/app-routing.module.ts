import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeContentsComponent } from './home-contents/home-contents.component';
import { ManageCourseComponent } from './manage-course/manage-course.component';
import { CreateNewCourseComponent } from './manage-course/create-new-course/create-new-course.component';
import { ManageEnrollmentComponent } from './manage-course/manage-enrollment/manage-enrollment.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeContentsComponent
  },
  {
    path: 'manage-course',
    component: ManageCourseComponent
  },
  {
    path: 'manage-course/create',
    component: CreateNewCourseComponent
  },
  {
    path: 'manage-course/enroll',
    component: ManageEnrollmentComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {


}
