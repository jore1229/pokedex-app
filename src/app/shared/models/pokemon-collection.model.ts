import { Pokemon } from './pokemon.model';

export class PokemonCollection {
    pokemonList = new Array<Pokemon>();
    pokemonCount: Number;

    ParseAPIresponse(response: any) {
        this.pokemonCount = response.count;
        this.pokemonCount = 20; // Force this to 20 for now for simple testing
        
        response['results'].forEach(result => {
            var pokemon = new Pokemon;
            pokemon.name = result.name;
            this.pokemonList.push(pokemon);
            //console.log(result);
        });
    }
}