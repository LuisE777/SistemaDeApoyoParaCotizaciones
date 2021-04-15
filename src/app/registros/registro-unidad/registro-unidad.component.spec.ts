import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroUnidadComponent } from './registro-unidad.component';

describe('RegistroUnidadComponent', () => {
  let component: RegistroUnidadComponent;
  let fixture: ComponentFixture<RegistroUnidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroUnidadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroUnidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
