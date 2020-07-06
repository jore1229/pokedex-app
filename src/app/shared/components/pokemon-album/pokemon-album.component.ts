import { Component, OnInit, Injector, ReflectiveInjector } from '@angular/core';
import { Pokemon } from '../../models/pokemon.model';
import { PokemonCardComponent, POKEMON } from '../pokemon-card/pokemon-card.component';
import { PokeCollectionService } from 'src/app/data/collection/poke-collection.service';


@Component({
  selector: 'app-pokemon-album',
  templateUrl: './pokemon-album.component.html',
  styleUrls: ['./pokemon-album.component.scss']
})
export class PokemonAlbumComponent implements OnInit {
  isAlbumLoaded: boolean = true;
  attributeInjector: Injector;
  parentInjector: Injector;
  pokemonCard = PokemonCardComponent;
  pokemonCollection = new Array<Pokemon>();

  constructor(injector: Injector, private pokeCollectionService: PokeCollectionService) {
    // Initialize the parent component injector
    this.parentInjector = injector;
  }

  ngOnInit() {
    this.pokeCollectionService.collectionNotification.subscribe(updatedCollection => {
      this.pokemonCollection = updatedCollection;
      this.isAlbumLoaded = false;
    });
  }

  InjectPokemonAttributes(pokemon: Pokemon) {
    this.attributeInjector = ReflectiveInjector.resolveAndCreate([{provide: POKEMON, useValue: pokemon}], this.parentInjector); 
  }

}
