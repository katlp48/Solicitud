import { TestBed } from '@angular/core/testing';

import { DetalleBecaService } from './detalle-beca.service';

describe('DetalleBecaService', () => {
  let service: DetalleBecaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetalleBecaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
