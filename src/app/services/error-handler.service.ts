import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor() { }

  // To define handling diff types of error
  handleError<K>(error:K) {

    console.log("[ErrorHandlerService] error", error);

  }

}
