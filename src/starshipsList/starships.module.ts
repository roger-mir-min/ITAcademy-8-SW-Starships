import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { HttpClientModule } from '@angular/common/http';

import { StarshipsListComponent } from './starshipsListComponent/starships-list.component';
import { StarshipCardComponent } from './starship-card/starship-card.component';
import { PilotCardComponent } from './starship-card/pilot-card/pilot-card.component';
import { FilmsComponent } from './starship-card/films/films.component';

import { HttpService } from './services/http.service';
import { Constants } from './constants/constants';

const routes: Routes = [
  { path: '', component: StarshipsListComponent },
  { path: ":id", component: StarshipCardComponent, }
];


@NgModule({
  declarations: [
    StarshipsListComponent,
    StarshipCardComponent,
    PilotCardComponent,
    FilmsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    InfiniteScrollModule,
    HttpClientModule
  ],
  exports: [],
  providers: [HttpService, Constants]
})
export class StarshipsModule { }
