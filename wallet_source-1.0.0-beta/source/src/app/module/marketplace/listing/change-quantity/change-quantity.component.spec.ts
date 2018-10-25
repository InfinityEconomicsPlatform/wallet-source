import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeQuantityComponent } from './change-quantity.component';

describe('ChangeQuantityComponent', () => {
  let component: ChangeQuantityComponent;
  let fixture: ComponentFixture<ChangeQuantityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeQuantityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeQuantityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
