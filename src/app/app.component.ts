import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {



  constructor() {
  }

  ngOnInit() {
    console.log("Welcome to Star Wars Starships page.");
    console.log("App-component has been initialized.");
  }

}