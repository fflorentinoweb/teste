import { TestBed, inject } from '@angular/core/testing';

import { DialogAutenticacaoFuncionarioService } from './dialog-autenticacao-funcionario.service';

describe('DialogAutenticacaoFuncionarioService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DialogAutenticacaoFuncionarioService]
    });
  });

  it('should be created', inject([DialogAutenticacaoFuncionarioService], (service: DialogAutenticacaoFuncionarioService) => {
    expect(service).toBeTruthy();
  }));
});
