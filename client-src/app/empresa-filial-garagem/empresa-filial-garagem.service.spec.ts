import { TestBed, inject } from '@angular/core/testing';

import { EmpresaFilialGaragemService } from './empresa-filial-garagem.service';

describe('EmpresaFilialGaragemService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmpresaFilialGaragemService]
    });
  });

  it('should be created', inject([EmpresaFilialGaragemService], (service: EmpresaFilialGaragemService) => {
    expect(service).toBeTruthy();
  }));
});
