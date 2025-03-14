import { Component, forwardRef, Input, NgZone } from '@angular/core';
import { ControlValueAccessor, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-search-container',
  templateUrl: './search-container.component.html',
  styleUrls: ['./search-container.component.scss'],
  providers: [{provide: NG_VALUE_ACCESSOR, multi: true, useExisting: forwardRef(() => SearchContainerComponent)}]
})
export class SearchContainerComponent implements ControlValueAccessor{

  @Input() dataFromParent!: {
    formGroup: FormGroup | null;
    users: any[]
  };

  selectedUsers: any[] = [];
  filteredUsers: any[] = [];

  onChange = (user: any) => {};
  onTouched = () => {};
  touched = false;
  disabled = false;

  constructor(private ngZone: NgZone) { }

  ngOnChanges(){


    this.filteredUsers = this.dataFromParent.users;

    console.log("Filtered User", this.filteredUsers);


  }

  ngOnInit(){


  }

  ngDoCheck(){

    this.updateSearchResult();

  }

  updateSearchResult = () => {

    console.log("Search input", this.dataFromParent.formGroup?.controls['userSearchInput'].value.toLowerCase());


    this.filteredUsers = this.dataFromParent.users.filter((user)=>{



      return user.name.toLowerCase().includes(this.dataFromParent.formGroup?.controls['userSearchInput'].value.toLowerCase());

    });

    console.log("Filtered Result", this.filteredUsers);

  }


  // CVA Required Methods
  writeValue(user: any){

    this.dataFromParent.formGroup?.controls['user'].setValue([...this.dataFromParent.formGroup?.controls['user'].value, user]);
    this.selectedUsers.push(user);

  }

  // CVA Required Methods
  registerOnChange(onChange: any){

    this.onChange = onChange;

  }

  // CVA Required Methods
  registerOnTouched(onTouched: any){


      this.onTouched = onTouched;

  }

  // CVA Required Methods
  markAsTouched(disabled: boolean){

    if(!this.touched){

      this.disabled = disabled;

    }

  }

}
