import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';

// ================================================
// DEV ENV: Environment Variables
// ================================================
import { environment as devEnvironment } from 'src/environment/environment.development';

// ================================================
// PROD ENV: Environment Variables
// ================================================
import { environment as prodEnvironment} from 'src/environment/environment';
import { PostRequest } from '../model/PostRequest';
import { PostResponse } from '../model/PostResponse';


@Injectable({
  providedIn: 'root'
})
export class EnrollService {

    // DEV ENV
    private DEV_API_URL = devEnvironment.API_URL;

    // PROD ENV (To use prior to prod deployment)
    private PROD_API_URL = prodEnvironment.API_URL;

  constructor(private httpClient: HttpClient) { }


  enrollUserToCourse(enrollmentForm: any): Observable<PostResponse<unknown> | unknown> {

    console.log("[enrollUserToCourse] enrollmentForm", enrollmentForm);

    const request: PostRequest = {

      request: 'Enroll User',
      data: enrollmentForm,
      timestamp: new Date().toDateString()

    }

    return this.httpClient
      .post(`${this.DEV_API_URL}/api/course/enrollByUser`, request)
      .pipe(catchError(error => error));


  }

}
