import { TestBed, inject } from '@angular/core/testing';

import { AgrupamentoMecanicoService } from './agrupamento-mecanico.service';

describe('AgrupamentoMecanicoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AgrupamentoMecanicoService]
    });
  });

  it('should be created', inject([AgrupamentoMecanicoService], (service: AgrupamentoMecanicoService) => {
    expect(service).toBeTruthy();
  }));
});
