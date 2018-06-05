import { TestBed, inject } from '@angular/core/testing';

import { DialogResultErrorService } from './dialog-result-error.service';

describe('DialogResultErrorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DialogResultErrorService]
    });
  });

  it('should be created', inject([DialogResultErrorService], (service: DialogResultErrorService) => {
    expect(service).toBeTruthy();
  }));
});
