import { Component, OnInit, Injector, ReflectiveInjector } from '@angular/core';
import { PokeApiService } from '../../data/poke-api.service';
import { Pokemon } from '../models/pokemon.model';
import { PokemonCollection } from '../models/pokemon-collection.model';
import { PokemonCardComponent, POKEMON } from '../pokemon-card/pokemon-card.component';

@Component({
  selector: 'app-pokemon-album',
  templateUrl: './pokemon-album.component.html',
  styleUrls: ['./pokemon-album.component.scss']
})
export class PokemonAlbumComponent implements OnInit {
  attributeInjector: Injector;
  parentInjector: Injector;
  pokemonCard = PokemonCardComponent;
  pokeCollection: PokemonCollection;

  constructor(pokeApiService: PokeApiService, injector: Injector) {
    // Initialize the parent component injector
    this.parentInjector = injector;

    // Provide service object
    this.pokeCollection = new PokemonCollection(pokeApiService);
    
    // Poll API for a complete list of pokemon
    pokeApiService.getPokemonList()
      .subscribe(
        response => this.ProcessAPIresponse(response)
      );
    
  }

  ngOnInit() {
  }

  ProcessAPIresponse(apiResponse: any) {
    this.pokeCollection.ParseAPIresponse(apiResponse);
  }

  InjectPokemonAttributes(pokemon: Pokemon) {
    this.attributeInjector = ReflectiveInjector.resolveAndCreate([{provide: POKEMON, useValue: pokemon}], this.parentInjector); 
  }

}
