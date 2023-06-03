import { Component } from '@angular/core';
import { HttpService } from 'src/starshipsList/services/http.service';
import { Input } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { starship, pilot } from '../../models/models';
import { Constants } from '../../constants/constants';


@Component({
  selector: 'app-pilot-card',
  templateUrl: './pilot-card.component.html',
  styleUrls: ['./pilot-card.component.scss']
})
export class PilotCardComponent {
  //Get the data (id) from card-component ("id" will be used)
  @Input() data: starship;
  //Array of the  pilots that will be displayed
  pilotsArr: pilot[];

  constructor (private constants: Constants, private httpService: HttpService) {}

  ngOnInit() {
    console.log("Pilots Component initialized.");

    //Iterate though the array of pilots of the given starship (to get name and img url for each)
    this.data.pilots?.map(async pilotUrl => {
      //if pilotsArr is not initialized, initialize
      if (Array.isArray(this.pilotsArr) == false) {
        this.pilotsArr = [];
      }

      //Create obj with pilot data (name and url) that will be pushed to pilotsArr
      const obj: pilot = { name: "", url: "" };

      //Get pilot id and use it to get obj url
      let id = pilotUrl.match(/[1-9]?\d|100/)![0];

      obj.url = this.constants.API_images +'/characters/' + id + '.jpg';

      //Get obj name
      const pil$ = this.httpService.getPilot(pilotUrl, { observe: 'body', responseType: 'json' });
      const pil = await lastValueFrom(pil$);
      obj.name = pil.name;

      //push obj to pilotsArr
      this.pilotsArr.push(obj);
    })
  }

}
