import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../configurations/app-config/app.config';

@Injectable({
  providedIn: 'root'
})
export class PokeApiService {
  apiUrl: string = AppConfig.settings.poke_api.url;

  constructor(private http: HttpClient) { 
  }

  getPokemon(pokemonName: string) {
    this.http.get(this.apiUrl + "pokemon/" + pokemonName).subscribe((response: any) => {
      console.log(response);
    })
  }

}
