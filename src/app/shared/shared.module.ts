import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HomePageComponent } from './home-page/home-page.component';
import { NavHeaderComponent } from './nav-header/nav-header.component';
import { PokemonCardComponent } from './pokemon-card/pokemon-card.component';
import { PokemonAlbumComponent } from './pokemon-album/pokemon-album.component';
import { PokemonStatsComponent } from './pokemon-stats/pokemon-stats.component';



@NgModule({
    imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      RouterModule,
    ],
    declarations: [
      HomePageComponent,
      NavHeaderComponent,
      PokemonCardComponent,
      PokemonAlbumComponent,
      PokemonStatsComponent
    ],
    exports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      RouterModule,
      NavHeaderComponent,
      PokemonAlbumComponent
    ]
  })
  export class SharedModule {}