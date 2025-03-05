import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-create-section',
  templateUrl: './create-section.component.html',
  styleUrls: ['./create-section.component.scss']
})
export class CreateSectionComponent {

  @Input() dataFromParent!: any;

  constructor(){

  }

  ngOnInit(){


  }

  ngAfterViewInit(){


  }



}
