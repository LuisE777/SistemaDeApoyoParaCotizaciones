import { TestBed } from '@angular/core/testing';

import { NoticeallService } from './noticeall.service';

describe('NoticeallService', () => {
  let service: NoticeallService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NoticeallService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
