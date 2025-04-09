import { TestBed } from '@angular/core/testing';

import { TypewritersService } from './typewriters.service';

describe('TypewriterService', () => {
  let service: TypewritersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypewritersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
