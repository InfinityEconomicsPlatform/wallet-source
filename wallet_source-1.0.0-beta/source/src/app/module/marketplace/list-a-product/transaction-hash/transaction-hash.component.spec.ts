import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionHashComponent } from './transaction-hash.component';

describe('TransactionHashComponent', () => {
  let component: TransactionHashComponent;
  let fixture: ComponentFixture<TransactionHashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionHashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionHashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
