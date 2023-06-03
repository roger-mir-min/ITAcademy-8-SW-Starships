import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(private router: Router, private route: ActivatedRoute, private title: Title) { }


  ngOnInit(): void {
    console.log("Home-component has been initialized.");
    this.title.setTitle("SW Home");
  }
  
  //When button is clicked, navigate to StarshipsList component
  homeRoute() {
    this.router.navigate(["starshipsList"]);
  }

  ngOnDestroy(): void {
    this.title.setTitle("SW Starship");
  }
}
