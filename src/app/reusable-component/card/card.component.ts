import { ChangeDetectorRef, Component, Input, SimpleChange } from '@angular/core';
import { CardNav } from 'src/app/model/CardNav';
import { Course } from 'src/app/model/Course';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {

  @Input()
  cardContent!: CardNav | Partial<Course> | null;
  isCardNav = false;
  isCourseCard = false;
  dirPath: string = `assets/image/`;
  imagePath: string | null = null;

  constructor(private changeDetectorRef: ChangeDetectorRef){}

  ngOnInit(){

    if(this.cardContent){

      this.isCardNav = 'route' in this.cardContent;
      this.isCourseCard = 'topic' in this.cardContent;

    }

    if(this.isCourseCard){

      this.imagePath = this.dirPath + this.cardContent?.image;

      console.log("Card Content Image - ", this.cardContent?.image);

      console.log("Image Path - ", this.imagePath);

    }


  }

  ngAfterViewInit(){

    console.log("cardContent", this.cardContent);

  }


  ngOnChanges(changes: SimpleChange){

    if(this.imagePath !== null){

      console.log("changes", changes);
      console.log("imagePath", this.imagePath);

      this.changeDetectorRef.detectChanges();

    }

  }

  onTitleChanged(newTitle: string){

    // this.title.title = newTitle;

  }

}
