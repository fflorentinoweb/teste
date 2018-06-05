import { TestBed, inject } from '@angular/core/testing';

import { TabsOverviewService } from './tabs-overview.service';

describe('TabsOverviewService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TabsOverviewService]
    });
  });

  it('should be created', inject([TabsOverviewService], (service: TabsOverviewService) => {
    expect(service).toBeTruthy();
  }));
});
