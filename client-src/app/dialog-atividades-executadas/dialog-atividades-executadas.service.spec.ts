import { TestBed, inject } from '@angular/core/testing';

import { DialogAtividadesExecutadasService } from './dialog-atividades-executadas.service';

describe('DialogAtividadesExecutadasService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DialogAtividadesExecutadasService]
    });
  });

  it('should be created', inject([DialogAtividadesExecutadasService], (service: DialogAtividadesExecutadasService) => {
    expect(service).toBeTruthy();
  }));
});
