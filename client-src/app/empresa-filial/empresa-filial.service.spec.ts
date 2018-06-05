import { TestBed, inject } from '@angular/core/testing';

import { EmpresaFilialService } from './empresa-filial.service';

describe('EmpresaFilialService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmpresaFilialService]
    });
  });

  it('should be created', inject([EmpresaFilialService], (service: EmpresaFilialService) => {
    expect(service).toBeTruthy();
  }));
});
