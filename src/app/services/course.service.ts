import { TimeService } from './time.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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
import { Section } from '../model/Section';
import { PostRequest } from '../model/PostRequest';


@Injectable({
  providedIn: 'root'
})
export class CourseService {

  // DEV ENV
  private DEV_API_URL = devEnvironment.API_URL;

  // PROD ENV (To use prior to prod deployment)
  private PROD_API_URL = prodEnvironment.API_URL;

  arrayOfReappendedSections: Section[] = [];

  constructor(
    private httpClient: HttpClient,
    private timeService: TimeService) { }


  getAllCourses_SuperUser(): Observable<any>{


    const request: any = {

      // userID: 'ef98feb1-4baf-430c-abb4-43e96a4654b6',
      user: 'root'

    };

    return this.httpClient
      .post(`${this.DEV_API_URL}/api/course/all`, request)
      .pipe(catchError(error => error));


  }

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


  pushToSectionMultimedia(multimedia: Section): void{

    this.arrayOfReappendedSections.push(multimedia);

    console.log("this.arrayOfReappendedSections", this.arrayOfReappendedSections);

  }

  removeFromSectionMultimediaByKeyValuePair(section: Section): void{

    // Remove Section Multimedia by chapterNumber and sectionNumber by filter
    this.arrayOfReappendedSections = this.arrayOfReappendedSections.filter((item: Section) => {

      console.log("item", item.sectionTitle);
      console.log("section", section.sectionTitle);

      // Return sections that do not match - essentially removing the requested section data
      return item.sectionTitle !== section.sectionTitle
        || item.sectionNumber !== section.sectionNumber
        || item.sectionDescription !== section.sectionDescription
        || item.sectionOutcome !== section.sectionOutcome
        || item.sectionMultimedia !== section.sectionMultimedia;

    });

    console.log("[Remove by keyvalue pair] this.arrayOfReappendedSections", this.arrayOfReappendedSections);

  }

  publishCourse(createNewCourseFormData: any): Observable<any>[]{

    console.log("[Before stitchFormDataWithAppendedSectionData] createNewCourseFormData", createNewCourseFormData);

    // (1) Restitch appended section data with latest form data
    const newCourseFormDataWithAppendedSectionData = this.stitchFormDataWithAppendedSectionData(createNewCourseFormData);

    console.log("[Before stitchFormDataWithAppendedSectionData] newCourseFormDataWithAppendedSectionData", newCourseFormDataWithAppendedSectionData);


    const multimediaDataArray = newCourseFormDataWithAppendedSectionData?.courseChapters[0].section.map((s: any) => {

      if((s.sectionMultimedia.file !== null || s.sectionMultimedia.file !== undefined)){

        return s.sectionMultimedia;

      }else{

        return null;

      }

    });

    // (2) Send to backend
    return [
      this.postNewCourseFormData(newCourseFormDataWithAppendedSectionData),
      this.postNewCourseMultimediaFiles(multimediaDataArray)
    ];

  }

  stitchFormDataWithAppendedSectionData(createNewCourseFormData: any){

    console.log("[stitchFormDataWithAppendedSectionData] createNewCourseFormData", createNewCourseFormData);

    var restitchedFormData = {
      ...createNewCourseFormData
    };

    const savedSections = restitchedFormData.courseChapters[0].section.filter((section: any, index: number) => {

      console.log("[stitchFormDataWithAppendedSectionData] restitchedFormData", section);

      if(section._sectionIsSaved){

        return section;

      }

    });

    restitchedFormData.courseChapters[0].section = savedSections;

    console.log("[stitchFormDataWithAppendedSectionData] restitchedFormData", restitchedFormData);

    restitchedFormData?.courseChapters[0].section.forEach((section: any, index: number) => {

      var section = restitchedFormData.courseChapters[0].section[index];

      section = this.arrayOfReappendedSections[index];

    });



    console.log("[After stitchFormDataWithAppendedSectionData] createNewCourseFormData", createNewCourseFormData);

    // return [createNewCourseFormData, multimediaDataArray];
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
  postNewCourseFormData(newCourseFormData: any): Observable<any>{


    var fileNames = [];

    // const convertedMultimediaFileArray = multimediaDataArray.forEach((multimediaData: any)=>{

    //   var fileData: FormData = new FormData();
    //   fileData.append('file', multimediaData.file);
    //   fileNames.push(multimediaData.file.name);

    // });

    const request: PostRequest = {

      request: 'New Course',
      data: newCourseFormData,
      timestamp: this.timeService.getCurrentTimestamp()
    }

    console.log("[postNewCourse] Request",request)

    return this.httpClient
      .post(`${this.DEV_API_URL}/api/course/new`, request)
      .pipe(catchError(error => error));

  }

  postNewCourseMultimediaFiles(courseMultimediaFiles: any): Observable<any>{

    var fileDataArray: FormData = new FormData();
    courseMultimediaFiles.forEach((multimediaData: any)=>{

      console.log("[postNewCourseMultimediaFiles] multimediaData", multimediaData);

      if(multimediaData.file === undefined || multimediaData === undefined || multimediaData === null){

        return null;

      }

      return fileDataArray
        .append('files[]',
          multimediaData.file,
          `chapter${multimediaData.chapterNumber}-section${multimediaData.sectionNumber}-${multimediaData.file.name}`
          );
      // fileNames.push(multimediaData.file.name);

    });

    const httpHeader = new HttpHeaders();
    httpHeader.append('Content-Type', 'multipart/form-data');

    return this.httpClient
      .post(`${this.DEV_API_URL}/api/course/new/upload`, fileDataArray, {headers: httpHeader})
      .pipe(catchError(error => error));

  }




}
