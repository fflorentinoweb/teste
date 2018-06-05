import { TestBed, inject } from '@angular/core/testing';

import { RegistroDePresencaService } from './registro-de-presenca.service';

describe('RegistroDePresencaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RegistroDePresencaService]
    });
  });

  it('should be created', inject([RegistroDePresencaService], (service: RegistroDePresencaService) => {
    expect(service).toBeTruthy();
  }));
});
