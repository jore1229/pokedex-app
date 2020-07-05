/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PokeCollectionService } from './poke-collection.service';

describe('Service: PokeCollection', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PokeCollectionService]
    });
  });

  it('should ...', inject([PokeCollectionService], (service: PokeCollectionService) => {
    expect(service).toBeTruthy();
  }));
});
