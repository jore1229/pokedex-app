import { Component, OnInit, Injector, ReflectiveInjector } from '@angular/core';
import { Pokemon } from '../models/pokemon.model';
import { PokemonCardComponent, POKEMON } from '../pokemon-card/pokemon-card.component';
import { PokeCollectionService } from 'src/app/data/collection/poke-collection.service';


@Component({
  selector: 'app-pokemon-album',
  templateUrl: './pokemon-album.component.html',
  styleUrls: ['./pokemon-album.component.scss']
})
export class PokemonAlbumComponent implements OnInit {
  attributeInjector: Injector;
  parentInjector: Injector;
  pokemonCard = PokemonCardComponent;
  pokemonList = new Array<Pokemon>();

  constructor(injector: Injector, pokeCollectionService: PokeCollectionService ) {
    // Initialize the parent component injector
    this.parentInjector = injector;
    this.pokemonList = pokeCollectionService.ExtractPokemonData(0, 25);
  }

  ngOnInit() {
  }

  InjectPokemonAttributes(pokemon: Pokemon) {
    this.attributeInjector = ReflectiveInjector.resolveAndCreate([{provide: POKEMON, useValue: pokemon}], this.parentInjector); 
  }

}
