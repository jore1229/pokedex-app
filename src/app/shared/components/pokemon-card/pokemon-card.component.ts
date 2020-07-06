import { Component, OnInit, Inject, InjectionToken, Input } from '@angular/core';
import { Pokemon } from '../../models/pokemon.model';
import { ColorConverter } from '../../models/color-converter.model';

export const POKEMON = new InjectionToken<Pokemon>('pokemon', { providedIn: 'root',  factory: () => new Pokemon() } ); 

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss']
})
export class PokemonCardComponent implements OnInit {
  @Input() pokemon: Pokemon;
  colorToRGBA = ColorConverter.colorToRGBA;

  constructor(@Inject(POKEMON) private pokemonInjected: Pokemon) { 
  }

  ngOnInit() {
    this.pokemon = this.pokemon || this.pokemonInjected;
  }

  assignCardColor(pokemon: Pokemon) {
    const rgbArray = this.colorToRGBA(this.pokemon.color);
    let styles = {
      'background-color': 'rgba(' + rgbArray[0] + ',' + rgbArray[1] + ',' + rgbArray[2] + ', 0.15'
    };
    return styles;
  }

}
