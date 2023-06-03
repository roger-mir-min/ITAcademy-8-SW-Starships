import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: []
})
export class LoginComponent {

  constructor(private loginService: LoginService, private fb: FormBuilder) { }
  
//Create form
logForm: FormGroup;

//Functions to make it easier to get inputEmail and inputKey
get getEmail() {
  return this.logForm.get("inputEmail");
}
  
get getKey() {
  return this.logForm.get("inputKey");
}
  
userNotFoundError: boolean = false;

  ngOnInit() {

    //Initilialize form
    this.logForm = this.fb.group({
      inputEmail: ["", [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      inputKey: ["", Validators.required]
    });

    //Get data from localStorage through service
    this.loginService.getLocal();
    if (this.loginService.isLoggedIn == true) {
      console.log("The current user is: ");
      console.log(this.loginService.currentUser);
    } else {
      console.log("Currently there is no user logged.")
    }

    }

  submit(formValue: any): void {
    if (this.loginService.isLoggedIn == true) {
      console.log("There is a logged user already.");
    } else {
      this.userNotFoundError = this.loginService.login({ email: formValue.inputEmail, key: formValue.inputKey });
      console.log("The introduced user is: ");
      console.log(formValue);
    }
  }
    
}
