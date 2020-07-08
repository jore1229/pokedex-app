import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { Pokemon } from '../../shared/models/pokemon.model';
import { PokeApiService } from '../api/poke-api.service';
import { PokeCollectionService } from '../collection/poke-collection.service';

@Injectable({
  providedIn: 'root'
})
export class PokeExtractionService {

  constructor(private pokeApiService: PokeApiService, private pokeCollectionService: PokeCollectionService) {}

  ExtractPokemonData(offset:Number=0, numberOfPokemon:Number=25) {
    this.pokeApiService.getPokemonList(offset, numberOfPokemon)
    .pipe(
        map(response => {
            const pokemonDataArray = response['results'];     
            return pokemonDataArray;
        }),
        mergeMap(pokemonDataArray => {
            let apiRequests = new Array<Observable<any>>();
            pokemonDataArray.forEach(pokemonData => {
                this.AssignPokemonNameAndSprite(pokemonData);
                apiRequests.push(this.pokeApiService.getPokemonData(pokemonData.url));
            });
            return forkJoin(apiRequests);
        }),
    )
    .subscribe(apiResponse => {
        let apiRequests = new Array<Observable<any>>();
        apiResponse.forEach(pokemonData => {
            this.AssignHeightWeightTypes(pokemonData);
            apiRequests.push(this.pokeApiService.getPokemonData(pokemonData.species.url));
        });
        forkJoin(apiRequests).subscribe(pokemonSpeciesArray => {
            pokemonSpeciesArray.forEach(pokemonSpeciesData => {
                this.AssignColorNumberFlavor(pokemonSpeciesData,);
            })
            this.pokeCollectionService.ExtractionCompleted();
        })
    })
  }

  private AssignPokemonNameAndSprite(pokemonData: any) {
    let pokemon = new Pokemon();
    pokemon.name = pokemonData.name;
    pokemon.frontImageUrl = "/assets/pokemon-front-images/" + pokemonData.name + ".png";
    pokemon.backImageUrl = "/assets/pokemon-back-images/" + pokemonData.name + ".png";
    pokemon.frontShinyImageUrl = "/assets/pokemon-front-shiny-images/" + pokemonData.name + ".png";
    pokemon.backShinyImageUrl = "/assets/pokemon-back-shiny-images/" + pokemonData.name + ".png";
    this.pokeCollectionService.AddPokemonToCollection(pokemon);
  }

  private AssignHeightWeightTypes(pokemonData: any) {
    let pokemon = this.pokeCollectionService.GetPokemonInCollection(pokemonData.name);
    pokemon.height = pokemonData.height*0.336;  // Convert to lbs
    pokemon.weight = pokemonData.weight*0.22;   // Convert to ft
    pokemonData['types'].forEach(type => {
        pokemon.types.push(type['type']['name']);
    });
    this.pokeCollectionService.UpdatePokemonInCollection(pokemon);
  }

  private AssignColorNumberFlavor(pokemonSpeciesData: any) {
    let pokemon = this.pokeCollectionService.GetPokemonInCollection(pokemonSpeciesData.name);
    pokemon.color = pokemonSpeciesData.color.name;
    pokemon.number = pokemonSpeciesData.pokedex_numbers[0].entry_number;
    pokemon.flavorText = this.AssignEnglishFlavorText(pokemonSpeciesData.flavor_text_entries);
    this.pokeCollectionService.UpdatePokemonInCollection(pokemon);
  }

  private AssignEnglishFlavorText(flavorTextArray: Array<any>): string {
    let index = flavorTextArray.map(function(flavorTextData) { 
        return flavorTextData.language.name; 
    }).indexOf("en");
    return flavorTextArray[index].flavor_text.replace(/[^a-zA-Z .éÉ]/g, " ");
  }
}
