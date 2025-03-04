import { Component, Input } from '@angular/core';
import { CardNav } from 'src/app/model/CardNav';
import { Course } from 'src/app/model/Course';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {

  @Input()
  cardContent!: CardNav | null;

  constructor(){}

  ngOnInit(){

  }

  onTitleChanged(newTitle: string){

    // this.title.title = newTitle;

  }

}
