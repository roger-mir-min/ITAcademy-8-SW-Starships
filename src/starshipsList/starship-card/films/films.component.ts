import { Component } from '@angular/core';
import { HttpService } from 'src/starshipsList/services/http.service';
import { Input } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { film, starship } from '../../models/models';
import { Constants } from '../../constants/constants';

@Component({
  selector: 'app-films-component',
  templateUrl: './films-component.html',
  styleUrls: ['./films-component.scss']
})
export class FilmsComponent {
  //Get starship data from card component ("id" will be used)
  @Input() data: starship;

  //Array of the films that will be displayed
  filmsArr: film[];

  constructor (private constants: Constants, private httpService: HttpService) {}

  ngOnInit() {
    console.log("Films Component initialized.");

    //Iterate though the array of films of the given starship (to get title and img url for each)
    this.data.films?.map(async filmUrl => {

      //if pilotsArr is not initialized, initialize
      console.log(filmUrl)
      if (Array.isArray(this.filmsArr) == false) {
        this.filmsArr = [];
      }

      //Create obj with film data (title and url) that will be pushed to pilotsArr
      const obj: film = { title: "", url: "" };

      //Get pilot id and use it to get obj url
      let id = filmUrl.match(/[1-9]?\d|100/)![0];

      //Get obj url
      obj.url = this.constants.API_images + '/films/' + id + '.jpg';

      //Get obj title
      const film$ = this.httpService.getFilm(filmUrl, { observe: 'body', responseType: 'json' });
      const film = await lastValueFrom(film$);
      obj.title = film.title;

      //push obj to filmsArr
      this.filmsArr.push(obj);
    })
  }

}
