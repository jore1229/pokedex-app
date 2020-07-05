import { map, mergeMap } from 'rxjs/operators';
import { PokeApiService } from '../../data/poke-api.service';
import { Pokemon } from './pokemon.model';
import { Observable, forkJoin } from 'rxjs';

export class PokemonCollection {
    pokemonList = new Array<Pokemon>();
    pokemonCount: Number;

    constructor(private pokeApiService: PokeApiService) {}

    ExtractPokemonData(offset: Number, numberOfPokemon: Number) {
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
                    this.AssignColorNumberFlavor(pokemonSpeciesData);
                })
            })
        })
    }

    private AssignPokemonNameAndSprite(pokemonData: any) {
        let pokemon = new Pokemon();
        pokemon.name = pokemonData.name;
        pokemon.imageUrl = "/assets/pokemon-front-images/" + pokemonData.name + ".png";
        this.pokemonList.push(pokemon);
    }

    private AssignHeightWeightTypes(pokemonData: any) {
        let index = this.pokemonList.map(function(pokemon) { return pokemon.name; }).indexOf(pokemonData.name)
        this.pokemonList[index].height = pokemonData.height;
        this.pokemonList[index].weight = pokemonData.weight;
        pokemonData['types'].forEach(type => {
            this.pokemonList[index].types.push(type['type']['name']);
        });
    }

    private AssignColorNumberFlavor(pokemonSpeciesData: any) {
        let index = this.pokemonList.map(function(pokemon) { return pokemon.name; }).indexOf(pokemonSpeciesData.name);
        this.pokemonList[index].color = pokemonSpeciesData.color.name;
        this.pokemonList[index].number = pokemonSpeciesData.pokedex_numbers[0].entry_number;
        this.pokemonList[index].flavorText = this.AssignEnglishFlavorText(pokemonSpeciesData.flavor_text_entries)
    }

    private AssignEnglishFlavorText(flavorTextArray: Array<any>): string {
        let index = flavorTextArray.map(function(flavorTextData) { 
            return flavorTextData.language.name; 
        }).indexOf("en");
        return flavorTextArray[index].flavor_text.replace(/[^a-zA-Z .éÉ]/g, " ");
    }
}