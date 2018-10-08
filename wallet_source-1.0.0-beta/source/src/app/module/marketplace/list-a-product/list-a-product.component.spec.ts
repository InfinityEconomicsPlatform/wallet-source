import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAProductComponent } from './list-a-product.component';

describe('ListAProductComponent', () => {
  let component: ListAProductComponent;
  let fixture: ComponentFixture<ListAProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListAProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
