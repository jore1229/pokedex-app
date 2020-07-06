import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Pokemon } from '../../models/pokemon.model';
import { PokeCollectionService } from 'src/app/data/collection/poke-collection.service';

@Component({
  selector: 'app-pokemon-stats',
  templateUrl: './pokemon-stats.component.html',
  styleUrls: ['./pokemon-stats.component.scss']
})
export class PokemonStatsComponent implements OnInit {
  pokemonCollection = new Array<Pokemon>();
  pokemonName: string;
  pokemon: Pokemon;

  constructor(private route: ActivatedRoute, private pokeCollectionService: PokeCollectionService) { 
    this.route.params.subscribe( params => this.pokemonName = params.pokemon );
    this.pokemonCollection = this.pokeCollectionService.GetPokemonCollection();
    this.LocatePokemon();
  }

  ngOnInit() {
    this.pokeCollectionService.collectionNotification.subscribe(updatedCollection => {
      this.pokemonCollection = updatedCollection;
    });
  }

  LocatePokemon() {
    let index = this.pokemonCollection.map(function(pokemon) { return pokemon.name; }).indexOf(this.pokemonName);
    this.pokemon = this.pokemonCollection[index];
  }
}
