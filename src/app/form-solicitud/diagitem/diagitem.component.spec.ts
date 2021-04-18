import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagitemComponent } from './diagitem.component';

describe('DiagitemComponent', () => {
  let component: DiagitemComponent;
  let fixture: ComponentFixture<DiagitemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiagitemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
