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

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  // DEV ENV
  private DEV_API_URL = devEnvironment.API_URL;

  // PROD ENV (To use prior to prod deployment)
  private PROD_API_URL = prodEnvironment.API_URL;

  constructor(
    private httpClient: HttpClient) { }


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

}
