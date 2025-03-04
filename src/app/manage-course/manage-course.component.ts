import { CardNav } from './../model/CardNav';
import { Component } from '@angular/core';
import { AdminService } from '../services/user-management/admin.service';

@Component({
  selector: 'app-manage-course',
  templateUrl: './manage-course.component.html',
  styleUrls: ['./manage-course.component.scss']
})
export class ManageCourseComponent {

  manageCourseLinks: CardNav[] | null = null;

  constructor(
    private adminService: AdminService
  ){}


  ngOnInit(){

    this.manageCourseLinks = this.adminService.getManageCourseLinks();

  }




}
