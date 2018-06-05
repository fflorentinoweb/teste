import { TestBed, inject } from '@angular/core/testing';

import { DialogComplementoDefeitoService } from './dialog-complemento-defeito.service';

describe('DialogComplementoDefeitoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DialogComplementoDefeitoService]
    });
  });

  it('should be created', inject([DialogComplementoDefeitoService], (service: DialogComplementoDefeitoService) => {
    expect(service).toBeTruthy();
  }));
});
