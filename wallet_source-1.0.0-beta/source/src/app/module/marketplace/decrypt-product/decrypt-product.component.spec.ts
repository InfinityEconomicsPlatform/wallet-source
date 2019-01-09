import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecryptProductComponent } from './decrypt-product.component';

describe('DecryptProductComponent', () => {
  let component: DecryptProductComponent;
  let fixture: ComponentFixture<DecryptProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecryptProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecryptProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
