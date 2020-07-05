import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { publishReplay, refCount } from 'rxjs/operators';
import { AppConfig } from '../../configurations/app-config/app.config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokeApiService {
  apiUrl: string = AppConfig.settings.poke_api.base_url + AppConfig.settings.poke_api.base_api;

  constructor(private http: HttpClient) { 
  }

  getPokemonList(offset: Number, numberOfPokemon: Number): Observable<any> {
    const url = this.apiUrl + "pokemon/?" + String(offset) + "&limit=" + String(numberOfPokemon);
    return this.createObservable(url);
  }

  getPokemonData(dataUrl: string): Observable<any> {
    return this.createObservable(dataUrl);
  }

  private createObservable(url: string): Observable<any> {
    return this.http.get(url)
      .pipe(
        publishReplay(1),
        refCount()
      );
  }
}
