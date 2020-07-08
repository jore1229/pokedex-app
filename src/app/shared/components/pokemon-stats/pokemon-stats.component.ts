import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Pokemon } from '../../models/pokemon.model';
import { ColorConverter } from '../../models/color-converter.model';
import { PokeCollectionService } from 'src/app/data/collection/poke-collection.service';
import { isNullOrUndefined } from 'util';
import { isEmpty } from 'rxjs/operators';

@Component({
  selector: 'app-pokemon-stats',
  templateUrl: './pokemon-stats.component.html',
  styleUrls: ['./pokemon-stats.component.scss']
})
export class PokemonStatsComponent implements OnInit {
  pokemonCollection = new Array<Pokemon>();
  pokemonName: string;
  pokemon: Pokemon;
  colorToRGBA = ColorConverter.colorToRGBA;

  constructor(private route: ActivatedRoute, private pokeCollectionService: PokeCollectionService) { 
    this.route.params.subscribe(params => this.pokemonName = params.pokemon);
  }

  ngOnInit() {
    this.pokeCollectionService.collectionNotification.subscribe(updatedCollection => {
      this.pokemonCollection = updatedCollection;
      this.LocatePokemon();
    });
  }

  LocatePokemon() {
    let index = this.pokemonCollection.map(function(pokemon) { return pokemon.name; }).indexOf(this.pokemonName);
    this.pokemon = this.pokemonCollection[index];
  }

  AssignProfileColor(pokemon: Pokemon) {
    const rgbArray = this.colorToRGBA(this.pokemon.color);
    let styles = {
      'background-color': 'rgba(' + rgbArray[0] + ',' + rgbArray[1] + ',' + rgbArray[2] + ', 0.1'
    };
    return styles;
  }

}
