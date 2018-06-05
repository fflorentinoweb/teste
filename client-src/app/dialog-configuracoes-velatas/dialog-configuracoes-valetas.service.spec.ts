import { TestBed, inject } from '@angular/core/testing';

import { DialogConfiguracoesValetasService } from './dialog-configuracoes-valetas.service';

describe('DialogConfiguracoesValetasService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DialogConfiguracoesValetasService]
    });
  });

  it('should be created', inject([DialogConfiguracoesValetasService], (service: DialogConfiguracoesValetasService) => {
    expect(service).toBeTruthy();
  }));
});
