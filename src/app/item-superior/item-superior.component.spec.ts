import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemSuperiorComponent } from './item-superior.component';

describe('ItemSuperiorComponent', () => {
  let component: ItemSuperiorComponent;
  let fixture: ComponentFixture<ItemSuperiorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemSuperiorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemSuperiorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
