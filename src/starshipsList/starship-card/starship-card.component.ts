import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../services/http.service';
import { Constants } from '../constants/constants';
import { starship } from '../models/models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-starship-card',
  templateUrl: './starship-card.component.html',
  styleUrls: ['./starship-card.component.scss']
})
export class StarshipCardComponent implements OnInit{

  id: string;
  starship: starship;
  httpSubscription: Subscription;
  altMsg: string;
  noImg: boolean;

  constructor(private constants: Constants, private route: ActivatedRoute, private httpService: HttpService) { }


  ngOnInit() {

    //get id from URL
    this.id = this.route.snapshot.paramMap.get('id')!;

    //Get starship
    this.callService();
      
    console.log("Starship-card component initialized");
  }

  callService() {
    //Get starship data from API
    this.httpSubscription = this.httpService.getStarship(this.constants.API_starships + `/${this.id}`, { observe: 'body', responseType: 'json' })
      .subscribe(data => {
        this.starship = data;
        //Get corresponding img url
        this.starship.img_url = this.constants.API_images + `/starships/${this.id}.jpg`;
        this.altMsg = `Of ${this.starship.name} no image there is`;
        this.noImg = false;
      });
  }

  handleMissingImage(event: Event) {
    (event.target as HTMLImageElement).classList.remove('d-block');
    (event.target as HTMLImageElement).classList.add('d-none');
    this.noImg = true;
  }

  //Unsubscribe
  ngOnDestroy() {
    if (this.httpSubscription) {
      this.httpSubscription.unsubscribe();
    }
  }

}
