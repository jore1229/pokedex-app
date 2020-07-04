import { PokeApiService } from '../../data/poke-api.service';
import { Pokemon } from './pokemon.model';

export class PokemonCollection {
    pokemonList = new Array<Pokemon>();
    pokemonCount: Number;

    constructor(private pokeApiService: PokeApiService) {}

    ParseAPIresponse(response: any) {
        this.pokemonCount = response.count;
        this.pokemonCount = 20; // Force this to 20 for now for simple testing
        
        response['results'].forEach(result => {
            var pokemon = new Pokemon();
            pokemon.name = result.name;
            pokemon = this.ParsePokemonURL(pokemon, result.url);
            this.pokemonList.push(pokemon);
            //console.log(result);
        });
    }

    ParsePokemonURL(pokemon: Pokemon, dataUrl: string): Pokemon {
        this.pokeApiService.getPokemonData(dataUrl).subscribe(
            result => { 
                pokemon.image_url = result.sprites.front_default;
            }
        );
        var colorUrl = dataUrl.replace("pokemon","pokemon-species");
        this.pokeApiService.getPokemonColor(colorUrl).subscribe(
            result => { 
                console.log(result);
                pokemon.color = result.color.name;
            }
        );

        return pokemon;
    }
}