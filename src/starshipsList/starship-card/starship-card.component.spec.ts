import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { StarshipCardComponent } from './starship-card.component';
import { HttpService } from '../services/http.service';
import { starship } from '../models/models';
import { Constants } from '../constants/constants';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import * as Rx from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

describe('StarshipCardComponent', () => {
    let component: StarshipCardComponent;
    let fixture: ComponentFixture<StarshipCardComponent>;
    let httpService: HttpService;
    
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, RouterTestingModule],
            declarations: [StarshipCardComponent],
            providers: [Constants, HttpService],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();
    });
    
    beforeEach(() => {
        fixture = TestBed.createComponent(StarshipCardComponent);
        component = fixture.componentInstance;
        httpService = TestBed.inject(HttpService);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
    
    it('calls the service', () => {
        spyOn(httpService, 'getStarship').and.callThrough();
        component.ngOnInit();
        expect(httpService.getStarship).toHaveBeenCalled();
    });

    it('starshipcard gets data from service', () => {
        const starship: starship = {
            url: 'http://swapi.dev/api/starships/1/',
            name: 'Death Star',
            model: 'DS-1 Orbital Battle Station',
            manufacturer: 'Paco',
            starship_class: 'Alpha-H',
            cost_in_credits: "5000e",
            max_atmosphering_speed: "3000",
            hyperdrive_rating: "2",
            MGLT: "fff",
            length: "20m",
            cargo_capacity: "3000T",
            crew: "Maria, Jan"
        };

        spyOn(httpService, "getStarship").and.callFake(() => {
            return Rx.of(starship);
        });
        component.callService();
        fixture.detectChanges();

        expect(Object.keys(component.starship).length).toBe(Object.keys(starship).length);

    });

    it('should display starship data', () => {
        const starship: starship = {
            url: 'http://swapi.dev/api/starships/1/',
            name: 'Death Star',
            model: 'DS-1 Orbital Battle Station',
            manufacturer: 'Paco',
            starship_class: 'Alpha-H',
            cost_in_credits: "5000e",
            max_atmosphering_speed: "3000",
            hyperdrive_rating: "2",
            MGLT: "fff",
            length: "20m",
            cargo_capacity: "3000T",
            crew: "Maria, Jan"
        };

        component.starship = starship;
        fixture.detectChanges();

        const debModel = fixture.debugElement.query(By.css('[data-testid="model"]'));
        const natModel = debModel.nativeElement;
        const modelUpperCase = starship.model.toUpperCase();
        expect(natModel.textContent).toEqual(`MODEL: ${modelUpperCase}`);
        
        const debMan = fixture.debugElement.query(By.css('[data-testid="manufacturer"]'));
        const natMan = debMan.nativeElement;
        const manufacturerUpperCase = starship.manufacturer?.toUpperCase();
        expect(natMan.textContent).toEqual(`MANUFACTURER: ${manufacturerUpperCase}`);

        const debLength = fixture.debugElement.query(By.css('[data-testid="length"]'));
        const natLength = debLength.nativeElement;
        const lengthUpperCase = starship.length?.toUpperCase();
        expect(natLength.textContent).toEqual(`LENGTH: ${lengthUpperCase}`);
    });

});
