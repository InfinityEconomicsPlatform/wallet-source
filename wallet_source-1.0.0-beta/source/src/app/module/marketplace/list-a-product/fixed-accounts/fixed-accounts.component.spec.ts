import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FixedAccountsComponent } from './fixed-accounts.component';

describe('FixedAccountsComponent', () => {
  let component: FixedAccountsComponent;
  let fixture: ComponentFixture<FixedAccountsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FixedAccountsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FixedAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
