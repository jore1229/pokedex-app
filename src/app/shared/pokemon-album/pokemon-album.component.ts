import { Component, OnInit, Injector, ReflectiveInjector } from '@angular/core';
import { PokeApiService } from '../../data/poke-api.service';
import { PokemonCollection } from '../models/pokemon-collection.model';
import { PokemonCardComponent, NAME } from '../pokemon-card/pokemon-card.component';

@Component({
  selector: 'app-pokemon-album',
  templateUrl: './pokemon-album.component.html',
  styleUrls: ['./pokemon-album.component.scss']
})
export class PokemonAlbumComponent implements OnInit {
  attributeInjector: Injector;
  parentInjector: Injector;
  pokemonCard = PokemonCardComponent;
  pokeCollection = new PokemonCollection();

  constructor(pokeApiService: PokeApiService, injector: Injector) {
    // Initialize the parent component injector
    this.parentInjector = injector;
    
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
    console.log(this.pokeCollection.pokemonList);
  }

  InjectPokemonAttributes(pokemonName: string) {
    this.attributeInjector = ReflectiveInjector.resolveAndCreate([{provide: NAME, useValue: pokemonName}], this.parentInjector); 
  }

}
