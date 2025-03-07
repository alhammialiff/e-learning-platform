import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimeService {

  constructor() { }


  // ===============================================
  // To serve as a one-stop formatted timestamp for the app
  // ===============================================
  getCurrentTimestamp(){

    return `${new Date().toLocaleDateString("en-GB")}, ${new Date().toLocaleTimeString()}`;

  }
}
