import { Component } from '@angular/core';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent {

  // Placeholder for actual links
  navLinks: string[] = ['Search Bar', 'Help', 'Notifications','Profile'];

  constructor(

  ){}

  ngOnInit(){


  }

  ngAfterViewInit(){


  }



}
