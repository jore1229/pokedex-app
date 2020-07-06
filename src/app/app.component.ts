import { Component } from '@angular/core';
import { PokeExtractionService } from './data/extraction/poke-extraction.service';
import { AppConfig } from './configurations/app-config/app.config';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'pokedex-app';

    constructor(private pokeExtractionService: PokeExtractionService) {
      // Perform default extraction
      this.pokeExtractionService.ExtractPokemonData(AppConfig.settings.poke_api.starting_index, AppConfig.settings.poke_api.display_count);
    }

    OnActivate(event) {
      window.scroll(0,0);
  }
}
