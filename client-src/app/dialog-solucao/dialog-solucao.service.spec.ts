import { TestBed, inject } from '@angular/core/testing';

import { DialogSolucaoService } from './dialog-solucao.service';

describe('DialogSolucaoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DialogSolucaoService]
    });
  });

  it('should be created', inject([DialogSolucaoService], (service: DialogSolucaoService) => {
    expect(service).toBeTruthy();
  }));
});
