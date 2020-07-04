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
            pokemon = this.ExtractPokemonSpeciesInformation(pokemon, result.url);
            pokemon = this.ParsePokemonURL(pokemon, result.url);

            // Add Pokemon to the collection
            this.pokemonList.push(pokemon);
        });
    }

    private LoadPokemonImage(pokemon: Pokemon): Pokemon {
        pokemon.imageUrl = "/assets/pokemon-front-images/" + pokemon.name + ".png";
        return pokemon;
    } 

    private ExtractPokemonSpeciesInformation(pokemon: Pokemon, dataUrl: string): Pokemon {
        var colorUrl = dataUrl.replace("pokemon","pokemon-species");
        this.pokeApiService.getPokemonColor(colorUrl).subscribe(
            result => { 
                //console.log(result);
                pokemon.color = result.color.name;
                pokemon.number = result.pokedex_numbers[0].entry_number;
                pokemon.flavorText = result.flavor_text_entries[0].flavor_text.replace(/[^a-zA-Z .éÉ]/g, " ");
            }
        );
        return pokemon;
    }

    private ParsePokemonURL(pokemon: Pokemon, dataUrl: string): Pokemon {
        this.pokeApiService.getPokemonData(dataUrl).subscribe(
            result => {   
                this.ExtractPokemonTypes(pokemon, result);
                this.ExtractPokemonHeightAndWeight(pokemon, result);
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
        pokemon.height = apiData['height'] * 0.3281;
        pokemon.weight = apiData['weight'] * 0.2205;
        return pokemon; 
    }
}