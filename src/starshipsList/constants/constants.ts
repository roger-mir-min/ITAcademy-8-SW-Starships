import { Injectable } from '@angular/core'; 

@Injectable() 
export class Constants {
//urls that are used in various pages of the project
public readonly API_starships: string = 'https://swapi.dev/api/starships'; 
public readonly API_starships_page: string = 'https://swapi.dev/api/starships/?page='; 
public readonly API_images: string = 'https://starwars-visualguide.com/assets/img/'; 
} 