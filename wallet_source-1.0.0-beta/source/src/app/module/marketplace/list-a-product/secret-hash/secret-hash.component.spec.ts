import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecretHashComponent } from './secret-hash.component';

describe('SecretHashComponent', () => {
  let component: SecretHashComponent;
  let fixture: ComponentFixture<SecretHashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecretHashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecretHashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
