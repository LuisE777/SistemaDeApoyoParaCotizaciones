import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroItemComponent } from './registro-item.component';

describe('RegistroItemComponent', () => {
  let component: RegistroItemComponent;
  let fixture: ComponentFixture<RegistroItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
