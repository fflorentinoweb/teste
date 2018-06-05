import { TestBed, inject } from '@angular/core/testing';

import { PainelDeValetasService } from './painel-de-valetas.service';

describe('PainelDeValetasService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PainelDeValetasService]
    });
  });

  it('should be created', inject([PainelDeValetasService], (service: PainelDeValetasService) => {
    expect(service).toBeTruthy();
  }));
});
