import { PokeApiService } from '../../data/poke-api.service';
import { Pokemon } from './pokemon.model';

export class PokemonCollection {
    pokemonList = new Array<Pokemon>();
    pokemonCount: Number;

    constructor(private pokeApiService: PokeApiService) {}

    ParseAPIresponse(response: any) {
        this.pokemonCount = response.count;
        
        response['results'].forEach(result => {
            // Assign Pokemon data parameters
            var pokemon = new Pokemon();
            pokemon.name = result.name;
            pokemon = this.LoadPokemonImage(pokemon);
            pokemon = this.ExtractPokemonColors(pokemon, result.url);
            pokemon = this.ParsePokemonURL(pokemon, result.url);

            // Add Pokemon to the collection
            this.pokemonList.push(pokemon);
        });
    }

    private LoadPokemonImage(pokemon: Pokemon): Pokemon {
        pokemon.image_url = "/assets/pokemon-front-images/" + pokemon.name + ".png";
        return pokemon;
    } 

    private ExtractPokemonColors(pokemon: Pokemon, dataUrl: string): Pokemon {
        var colorUrl = dataUrl.replace("pokemon","pokemon-species");
        this.pokeApiService.getPokemonColor(colorUrl).subscribe(
            result => { 
                pokemon.color = result.color.name;
            }
        );
        return pokemon;
    }

    private ParsePokemonURL(pokemon: Pokemon, dataUrl: string): Pokemon {
        this.pokeApiService.getPokemonData(dataUrl).subscribe(
            result => { 
                this.ExtractPokemonTypes(pokemon, result);
            }
        );
        return pokemon; 
    }

    private ExtractPokemonTypes(pokemon: Pokemon, apiData: any): Pokemon {
        apiData['types'].forEach(type => {
            pokemon.types.push(type['type']['name']);
        });
        return pokemon; 
    }

    private ExtractPokemonHeightAndWeight(pokemon: Pokemon, apiData: any): Pokemon {
        pokemon.height = apiData['height'];
        pokemon.weight = apiData['weight'];
        return pokemon; 
    }
}