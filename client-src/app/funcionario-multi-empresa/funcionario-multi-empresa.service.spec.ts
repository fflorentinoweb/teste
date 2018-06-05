import { TestBed, inject } from '@angular/core/testing';

import { FuncionarioMultiEmpresaService } from './funcionario-multi-empresa.service';

describe('FuncionarioMultiEmpresaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FuncionarioMultiEmpresaService]
    });
  });

  it('should be created', inject([FuncionarioMultiEmpresaService], (service: FuncionarioMultiEmpresaService) => {
    expect(service).toBeTruthy();
  }));
});
