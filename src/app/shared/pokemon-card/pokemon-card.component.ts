import { Component, OnInit, Inject, InjectionToken, Input } from '@angular/core';

export const NAME = new InjectionToken<string>('name', { providedIn: 'root',  factory: () => 'name' } ); 

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss']
})
export class PokemonCardComponent implements OnInit {
  @Input() pokemonName: string;

  constructor(@Inject(NAME) private nameInjected: string) { 
  }

  ngOnInit() {
    this.pokemonName = this.pokemonName || this.nameInjected;
  }

}
