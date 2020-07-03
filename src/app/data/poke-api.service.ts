import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { shareReplay, publishReplay, map, refCount } from 'rxjs/operators';
import { AppConfig } from '../configurations/app-config/app.config';
import { Observable } from 'rxjs';
import { analyzeAndValidateNgModules } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class PokeApiService {
  apiUrl: string = AppConfig.settings.poke_api.url;

  constructor(private http: HttpClient) { 
  }

  getPokemonList(): Observable<any> {
    const url = this.apiUrl + "pokemon/"
    return this.createObservable(url);
  }

  getPokemon(pokemonName: string): Observable<any>  {
    const url = this.apiUrl + "pokemon/" + pokemonName;
    return this.createObservable(url);
  }

  private createObservable(url: string): Observable<any> {
    return this.http.get(url)
      .pipe(
        publishReplay(1),
        refCount()
      );
  }
}
