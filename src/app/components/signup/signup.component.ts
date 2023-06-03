import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Login } from 'src/app/models/models';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  registerSuccess: boolean = true;

  //Create reactive form group
  signupForm: FormGroup; 

  constructor(private loginService: LoginService, private fb: FormBuilder) { 
    //Create form group (with form builder)
    this.signupForm = fb.group({
      inputEmail: ["", [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      inputKey: ["", [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
      inputRepKey: ["", [Validators.required, Validators.minLength(8), Validators.maxLength(20)]]
  }, { validators: this.confValidator('inputKey', 'inputRepKey') });
  }

  //Create custom validation
  confValidator(controlName: string, matchingControlName: string){
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];
        if (matchingControl.errors && !matchingControl.errors['confValidator']) {
            return;
        }
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ confValidator: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
}

//Functions to get the form controls (for validation)
get getEmail() {
  return this.signupForm.get("inputEmail");
}
  
get getKey() {
  return this.signupForm.get("inputKey");
}  

get getRepKey() {
  return this.signupForm.get("inputRepKey");
  }  
  
  
ngOnInit() {

//S'obtenen dades de localStorage al servei (i s'importa currentUser al component)
this.loginService.getLocal();
}

submit(formValue: any): void {
  if (formValue.inputKey == formValue.inputRepKey) {
    const logUser: Login = { email: formValue.inputEmail, key: formValue.inputKey };
  this.registerSuccess = this.loginService.register(logUser);
    this.loginService.login(logUser);
  } else {
  console.log("Error submit: two equal keys should be submitted.")
  }
}
}
