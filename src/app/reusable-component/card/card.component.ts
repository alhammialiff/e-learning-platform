import { Component, Input } from '@angular/core';
import { Course } from 'src/app/model/course';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {

  @Input()
  course!: Course;

  @Input()
  imageSrc!: string;

  constructor(){}

  ngOnInit(){

  }

  onTitleChanged(newTitle: string){

    this.course.title = newTitle;

  }

}
