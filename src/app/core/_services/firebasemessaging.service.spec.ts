import { TestBed } from '@angular/core/testing';

import { FirebasemessagingService } from './firebasemessaging.service';

describe('FirebasemessagingService', () => {
  let service: FirebasemessagingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirebasemessagingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
