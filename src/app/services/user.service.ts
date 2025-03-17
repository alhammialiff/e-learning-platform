import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PostRequest } from '../model/PostRequest';
import { catchError, Observable } from 'rxjs';
import { PostResponse } from '../model/PostResponse';
import { User } from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  getAllUsers(): Observable<PostResponse<User<'name' | 'id'>> | unknown>{

    const request: PostRequest = {

      request: 'Get All Users',
      data: {},
      timestamp: new Date().toDateString()

    }

    return this.httpClient
      .post('http://localhost:3005/api/user/all', request)
      .pipe(catchError(error => error));

  }

}
