import { TestBed, inject } from '@angular/core/testing';

import { DialogEncerramentoOsPendenciaService } from './dialog-encerramento-os-pendencia.service';

describe('DialogEncerramentoOsPendenciaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DialogEncerramentoOsPendenciaService]
    });
  });

  it('should be created', inject([DialogEncerramentoOsPendenciaService], (service: DialogEncerramentoOsPendenciaService) => {
    expect(service).toBeTruthy();
  }));
});
