import { TestBed, inject } from '@angular/core/testing';

import { OsMecanicosService } from './os-mecanicos.service';

describe('OsMecanicosService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OsMecanicosService]
    });
  });

  it('should be created', inject([OsMecanicosService], (service: OsMecanicosService) => {
    expect(service).toBeTruthy();
  }));
});
