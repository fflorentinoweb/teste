import { TestBed, inject } from '@angular/core/testing';

import { AutenticacaoMecanicoService } from './autenticacao-mecanico.service';

describe('AutenticacaoMecanicoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AutenticacaoMecanicoService]
    });
  });

  it('should be created', inject([AutenticacaoMecanicoService], (service: AutenticacaoMecanicoService) => {
    expect(service).toBeTruthy();
  }));
});
