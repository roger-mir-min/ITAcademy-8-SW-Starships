import { Component, OnInit } from '@angular/core';
import { Constants } from '../constants/constants';
import { HttpService } from '../services/http.service';
import { NgxSpinnerService } from "ngx-spinner";
import { starship } from '../models/models';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-starships-list',
  templateUrl: './starships-list.component.html',
  styleUrls: ['./starships-list.component.scss']
})
export class StarshipsListComponent implements OnInit{

  //Infinite scroll parameters
  page: number = 1;
  throttle: number = 500;
  distance: number = 1;

  //Type of spinner
  type: "line-spin-fade";

  //The array of starships we're going to display
  starshipsList: starship[] = [];
  
  //Subscriptions to httpService
  subscription: Subscription;

constructor(private constants: Constants, public httpService: HttpService, private spinner: NgxSpinnerService) {
}

  ngOnInit(): void {

    console.log("Starships-list component has been initialized.")

    //Call the service to get the data (starships)
    this.getService();
    ++this.page;
  }

  getService() {
    // Get starships list from API through httpService
    this.subscription = this.httpService.getList(this.constants.API_starships_page + `${this.page}`)
      .subscribe(data => {
        // Get the id of each starship (so we can assign them the corresponding url in the template)
        data.results.map(starship => {
          starship.id = starship.url!.match(/[1-9]?\d|100/)![0];
        });
        //push the starship to the list
        this.starshipsList.push(...data.results);
      });
      }
  
  
  onScroll() {
    if (this.page < 4) {
      console.log("On scroll");
      ++this.page;
      this.getService();
    }else(console.log("No more starships to show."))
    
  }
  
  //Unsubscribe
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
 
  }
    

}

