import { TestBed, inject } from '@angular/core/testing';

import { DialogCadastroTipoOleoService } from './dialog-cadastro-tipo-oleo.service';

describe('DialogCadastroTipoOleoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DialogCadastroTipoOleoService]
    });
  });

  it('should be created', inject([DialogCadastroTipoOleoService], (service: DialogCadastroTipoOleoService) => {
    expect(service).toBeTruthy();
  }));
});
