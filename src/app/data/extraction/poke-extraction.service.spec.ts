/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PokeExtractionService } from './poke-extraction.service';

describe('Service: PokeCollection', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PokeExtractionService]
    });
  });

  it('should ...', inject([PokeExtractionService], (service: PokeExtractionService) => {
    expect(service).toBeTruthy();
  }));
});
