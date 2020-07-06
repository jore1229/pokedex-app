import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Pokemon } from 'src/app/shared/models/pokemon.model';

@Injectable({
  providedIn: 'root'
})
export class PokeCollectionService {
  private pokemonCollection = new Array<Pokemon>(); 
  private messageSource = new BehaviorSubject(this.pokemonCollection);
  currentMessage = this.messageSource.asObservable();

  constructor() { }

  GetPokemonCollection() {
    return this.pokemonCollection;
  }

  GetPokemonInCollection(pokemonName: string): Pokemon {
    let index = this.pokemonCollection.map(function(pokemon) { return pokemon.name; }).indexOf(pokemonName);
    return this.pokemonCollection[index];
  }

  AddPokemonToCollection(pokemon: Pokemon) {
    this.pokemonCollection.push(pokemon)
  }

  UpdatePokemonInCollection(updatedPokemon: Pokemon) {
    let index = this.pokemonCollection.map(function(pokemon) { return pokemon.name; }).indexOf(updatedPokemon.name);
    this.pokemonCollection[index] = updatedPokemon;
  }

  ExtractionCompleted() {
    this.messageSource.next(this.pokemonCollection);
  }
}
