import { Injectable } from '@angular/core';
import { map, mergeMap } from 'rxjs/operators';
import { PokeApiService } from '../../data/api/poke-api.service';
import { Pokemon } from '../../shared/models/pokemon.model';
import { Observable, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokeCollectionService {
  
  pokemonCount: Number;

  constructor(private pokeApiService: PokeApiService) {}

  ExtractPokemonData(offset:Number=0, numberOfPokemon:Number=25): Array<Pokemon> {
    let pokemonList = new Array<Pokemon>();
    this.pokeApiService.getPokemonList(offset, numberOfPokemon)
    .pipe(
        map(response => {
            const pokemonDataArray = response['results'];     
            return pokemonDataArray;
        }),
        mergeMap(pokemonDataArray => {
            let apiRequests = new Array<Observable<any>>();
            pokemonDataArray.forEach(pokemonData => {
                this.AssignPokemonNameAndSprite(pokemonData, pokemonList);
                apiRequests.push(this.pokeApiService.getPokemonData(pokemonData.url));
            });
            return forkJoin(apiRequests);
        }),
    )
    .subscribe(apiResponse => {
        let apiRequests = new Array<Observable<any>>();
        apiResponse.forEach(pokemonData => {
            this.AssignHeightWeightTypes(pokemonData, pokemonList);
            apiRequests.push(this.pokeApiService.getPokemonData(pokemonData.species.url));
        });
        forkJoin(apiRequests).subscribe(pokemonSpeciesArray => {
            pokemonSpeciesArray.forEach(pokemonSpeciesData => {
                this.AssignColorNumberFlavor(pokemonSpeciesData, pokemonList);
            })
        })
    })
    return pokemonList;
  }

  private AssignPokemonNameAndSprite(pokemonData: any, pokemonList: Array<Pokemon>) {
      let pokemon = new Pokemon();
      pokemon.name = pokemonData.name;
      pokemon.imageUrl = "/assets/pokemon-front-images/" + pokemonData.name + ".png";
      pokemonList.push(pokemon);
  }

  private AssignHeightWeightTypes(pokemonData: any, pokemonList: Array<Pokemon>) {
      let index = pokemonList.map(function(pokemon) { return pokemon.name; }).indexOf(pokemonData.name)
      pokemonList[index].height = pokemonData.height*0.336;  // Convert to lbs
      pokemonList[index].weight = pokemonData.weight*0.22;   // Convert to ft
      pokemonData['types'].forEach(type => {
          pokemonList[index].types.push(type['type']['name']);
      });
  }

  private AssignColorNumberFlavor(pokemonSpeciesData: any, pokemonList: Array<Pokemon>) {
      let index = pokemonList.map(function(pokemon) { return pokemon.name; }).indexOf(pokemonSpeciesData.name);
      pokemonList[index].color = pokemonSpeciesData.color.name;
      pokemonList[index].number = pokemonSpeciesData.pokedex_numbers[0].entry_number;
      pokemonList[index].flavorText = this.AssignEnglishFlavorText(pokemonSpeciesData.flavor_text_entries)
  }

  private AssignEnglishFlavorText(flavorTextArray: Array<any>): string {
      let index = flavorTextArray.map(function(flavorTextData) { 
          return flavorTextData.language.name; 
      }).indexOf("en");
      return flavorTextArray[index].flavor_text.replace(/[^a-zA-Z .éÉ]/g, " ");
  }
}
