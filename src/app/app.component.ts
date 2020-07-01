import { Component } from '@angular/core';
import { PokeApiService } from './data/poke-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'pokedex-app';

    constructor(pokeApiService: PokeApiService) {
      pokeApiService.getPokemon("pikachu");
    }
  
}
