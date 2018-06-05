import { TestBed, inject } from '@angular/core/testing';

import { DialogCadastroDeValetaService } from './dialog-cadastro-de-valeta.service';

describe('DialogCadastroDeValetaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DialogCadastroDeValetaService]
    });
  });

  it('should be created', inject([DialogCadastroDeValetaService], (service: DialogCadastroDeValetaService) => {
    expect(service).toBeTruthy();
  }));
});
