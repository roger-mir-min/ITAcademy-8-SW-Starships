import { Injectable } from '@angular/core'; 
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { Login } from '../models/models';


@Injectable({
    providedIn: 'root'
}) 
export class LoginService { 

//Basic logging variables
isLoggedIn: boolean;
currentUser: Login; //current logged in user
logArr: Login[] = []; //array of users
    
//Observables of isLoggedin and currentUser, so that header-component can subscribe
//Subscription for isLoggedIn
private data = new Subject<boolean>();
data$ = this.data.asObservable();
subscription: Subscription = this.data$.subscribe(res => this.isLoggedIn = res)

changeData(data: boolean) {
    this.data.next(data);
}

//Subscription for currentUser
private currUser = new Subject<Login>;
currUser$ = this.currUser.asObservable();
subscript: Subscription = this.currUser$.subscribe(res => this.currentUser = res)
    
changeUser(log: Login) {
    this.currUser.next(log);
}
    
constructor(private router: Router) { } 
    
//Function to get data (array of registered users and currentUser) from localStorage
getLocal() {

    if (localStorage.getItem("arrLocal") != null) {
        this.logArr = JSON.parse(localStorage.getItem("arrLocal")!);
    }
    if (localStorage.getItem("currentUser") != undefined) {
        this.currentUser = JSON.parse(localStorage.getItem("currentUser")!);
        this.changeData(true);
        this.changeUser(this.currentUser);
    } else {
        this.changeData(false);
        this.changeUser({ email: "", key: "" });
    }
        
}

//Registering function: if user (email+key) is not registered, add user to logArr and to LocalStorage
register(log: Login): boolean {
    if (this.logArr.findIndex(x => x.email == log.email) == -1) {
        this.logArr.push(log);
        localStorage.setItem("arrLocal", JSON.stringify(this.logArr));
        console.log("User successfully registered.")
        console.log(localStorage.getItem("arrLocal"));
        this.router.navigate(["login"]);
        return true;
    } else {
        console.log("This user exists already. Can't register.");
        return false;
    }
}

//Login function: check whether introduced user exists in localStorage
//If so, update currentUser in service and LocalStorage, and navigate to starshipsList component
login(log: Login): boolean {
    if (localStorage.getItem("arrLocal") != null) {
        let n = JSON.parse(localStorage.getItem("arrLocal")!).findIndex((x: Login) => x.email == log.email);
        if (n != -1) {
            localStorage.setItem("currentUser", JSON.stringify(log));
            this.changeUser(log);
            this.changeData(true);
            console.log("Log in successful.");
            this.router.navigate(["starshipsList"]);
            return false;
        } else {
            console.log("The introduced email-key combination is incorrect.");
            return true;
        }
    } else {
        console.log("No users registered.");
        return true;
    }
}

//Unlog function: remove current currentUser from LocalStorage and update variables currentUser and data$ - login
unlog() {
        localStorage.removeItem("currentUser");
        this.changeUser({email: "", key: ""});
        this.changeData(false);
        this.router.navigate(["login"]);

        console.log("Unlogging succeeded.");
    
    }
    
    //Unsubscribe
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.subscript) {
      this.subscript.unsubscribe();
    }
  }

}