import { TestBed, inject } from '@angular/core/testing';

import { DialogCadastroDeGrupoDeValetaService } from './dialog-cadastro-de-grupo-de-valeta.service';

describe('DialogCadastroDeGrupoDeValetaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DialogCadastroDeGrupoDeValetaService]
    });
  });

  it('should be created', inject([DialogCadastroDeGrupoDeValetaService], (service: DialogCadastroDeGrupoDeValetaService) => {
    expect(service).toBeTruthy();
  }));
});
