import { TimeService } from './time.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, ObservedValueOf } from 'rxjs';

// ================================================
// DEV ENV: Environment Variables
// ================================================
import { environment as devEnvironment } from 'src/environment/environment.development';

// ================================================
// PROD ENV: Environment Variables
// ================================================
import { environment as prodEnvironment} from 'src/environment/environment';
import { SectionMultimedia } from '../model/SectionMultimedia';
import { PostRequest } from '../model/PostRequest';


@Injectable({
  providedIn: 'root'
})
export class CourseService {

  // DEV ENV
  private DEV_API_URL = devEnvironment.API_URL;

  // PROD ENV (To use prior to prod deployment)
  private PROD_API_URL = prodEnvironment.API_URL;

  arrayOfReappendedSections: SectionMultimedia[] = [];

  constructor(
    private httpClient: HttpClient,
    private timeService: TimeService) { }


  // ==============================================
  // Get All Courses By User ID
  // ==============================================
  getAllCoursesByUserID(): Observable<any>{


    const request: any = {

      userID: 'ef98feb1-4baf-430c-abb4-43e96a4654b6',
      user: 'testuser'

    };

    return this.httpClient
      .post(`${this.DEV_API_URL}/api/course/all`, request)
      .pipe(catchError(error => error));

  }


  pushToSectionMultimedia(multimedia: SectionMultimedia): void{

    this.arrayOfReappendedSections.push(multimedia);

    console.log("this.arrayOfReappendedSections", this.arrayOfReappendedSections);

  }

  removeFromSectionMultimediaByKeyValuePair(section: SectionMultimedia): void{

    // Remove Section Multimedia by chapterNumber and sectionNumber by filter
    this.arrayOfReappendedSections = this.arrayOfReappendedSections.filter((item: SectionMultimedia) => {

      console.log("item", item.sectionTitle);
      console.log("section", section.sectionTitle);

      // Return sections that do not match - essentially removing the requested section data
      return item.sectionTitle !== section.sectionTitle
        || item.sectionNumber !== section.sectionNumber
        || item.sectionDescription !== section.sectionDescription
        || item.sectionOutcome !== section.sectionOutcome
        || item.sectionContentMultimedia !== section.sectionContentMultimedia;
    });

    console.log("[Remove by keyvalue pair] this.arrayOfReappendedSections", this.arrayOfReappendedSections);

  }

  publishCourse(createNewCourseFormData: any): void{

    console.log("[Before stitchFormDataWithAppendedSectionData] createNewCourseFormData", createNewCourseFormData);

    // (1) Restitch appended section data with latest form data
    const newCourseFormDataWithAppendedSectionData = this.stitchFormDataWithAppendedSectionData(createNewCourseFormData);

    // (2) Send to backend
    this.postNewCourse(newCourseFormDataWithAppendedSectionData);

  }

  stitchFormDataWithAppendedSectionData(createNewCourseFormData: any): void{


    createNewCourseFormData?.courseChapters[0].section.forEach((section: any, index: number) => {

      createNewCourseFormData.courseChapters[0].section[index] = this.arrayOfReappendedSections[index];

    });

    console.log("[After stitchFormDataWithAppendedSectionData] createNewCourseFormData", createNewCourseFormData);

    return createNewCourseFormData;

  }

  // ==============================================
  // Post New Course
  //
  // Request Body:
  //    userID: Admin ID (later)
  //    courseData: Course Form Data
  //    timestamp: datetime (later)
  //    token: admin token (later)
  // ==============================================
  postNewCourse(newCourse: any): Observable<any>{


    const request: PostRequest = {

      request: 'New Course',
      data: newCourse,
      timestamp: this.timeService.getCurrentTimestamp()
    }

    console.log("[postNewCourse] Request",request)

    return this.httpClient
      .post(`${this.DEV_API_URL}/api/course/new`, request)
      .pipe(catchError(error => error));

  }


}
