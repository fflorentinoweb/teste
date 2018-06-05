import { TestBed, inject } from '@angular/core/testing';

import { ExecucaoDaOsService } from './execucao-da-os.service';

describe('ExecucaoDaOsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExecucaoDaOsService]
    });
  });

  it('should be created', inject([ExecucaoDaOsService], (service: ExecucaoDaOsService) => {
    expect(service).toBeTruthy();
  }));
});
