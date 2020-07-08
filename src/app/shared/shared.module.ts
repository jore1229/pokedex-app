import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HomePageComponent } from './components/home-page/home-page.component';
import { NavHeaderComponent } from './components/nav-header/nav-header.component';
import { PokeLoadingProgressComponent } from './components/poke-loading-progress/poke-loading-progress.component';
import { PokemonCardComponent } from './components/pokemon-card/pokemon-card.component';
import { PokemonAlbumComponent } from './components/pokemon-album/pokemon-album.component';
import { PokemonStatsComponent } from './components/pokemon-stats/pokemon-stats.component';


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
      PokeLoadingProgressComponent,
      PokemonCardComponent,
      PokemonAlbumComponent,
      PokemonStatsComponent,
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