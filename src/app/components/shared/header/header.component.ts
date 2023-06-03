import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../services/login.service';
import { Subscription } from 'rxjs';
import { Login } from 'src/app/models/models';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isLoggedIn: boolean;
  subscription: Subscription;
  currentUser: Login;
  private subscript: Subscription;

  constructor(private loginService: LoginService) {}

ngOnInit(){
  console.log("Header-component has been initialized.");

    //Subscription to service
    this.subscription = this.loginService.data$.subscribe(
      res => this.isLoggedIn = res);
    this.subscript = this.loginService.currUser$.subscribe(res => {
      this.currentUser = res;
      });

    //Get data from localStorage (service observables emit data catched by header component subscriptions)
    this.loginService.getLocal();
    if (this.currentUser) {
      console.log("User logged in: ")
      console.log(this.currentUser);
    } else {
      console.log("No user logged in.")
    }
}
  
    unlog() {
    this.loginService.unlog();
  }
  
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.subscript) {
      this.subscript.unsubscribe();
    }
  }
  
}
