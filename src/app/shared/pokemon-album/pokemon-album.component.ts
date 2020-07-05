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

  constructor(injector: Injector, pokeApiService: PokeApiService) {
    // Initialize the parent component injector
    this.parentInjector = injector;
    this.pokeCollection = new PokemonCollection(pokeApiService);
    this.pokeCollection.ExtractPokemonData(0, 25);
  }

  ngOnInit() {
  }

  InjectPokemonAttributes(pokemon: Pokemon) {
    this.attributeInjector = ReflectiveInjector.resolveAndCreate([{provide: POKEMON, useValue: pokemon}], this.parentInjector); 
  }

}
