import { Injectable } from '@angular/core'; 
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { apiResponse, starship, httpOptions, pilot, film } from '../models/models';


@Injectable({
    providedIn: 'root'
}) 
export class HttpService { 

constructor(private http: HttpClient) {} 

//Get list of starships from API
public getList(url: string, options?: httpOptions): Observable<apiResponse> {
return this.http.get<apiResponse>(url, options).pipe(
  catchError(() => {
  return of({results: [{url: '#', name: 'No starships to display', model: 'API not available', id: "#"
                }]
          })
        }
        )
      )
    }

//Get starship data from API
public getStarship(url: string, options?: httpOptions): Observable<starship> {
    return this.http.get<starship>(url, options).pipe(
    catchError(() => {
    return of({ url: '#', name: 'No starships to display', model: 'API not available', id: "#" })
        }
        )
      );
  }

//Get pilot data from API
public getPilot(url: string, options?: httpOptions): Observable<pilot> {
  return this.http.get<pilot>(url, options).pipe(
    catchError(() => {
    return of({ url: '#', name: 'No pilots to display', id: "#" })
        }
        )
      );
}

//Get film data from API
public getFilm(url: string, options?: httpOptions): Observable<film> {
  return this.http.get<film>(url, options).pipe(
    catchError(() => {
    return of({ title: 'No films to display', id: "#" })
        }
        )
      );
}
}