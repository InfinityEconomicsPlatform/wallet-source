import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessWithoutApprovalComponent } from './process-without-approval.component';

describe('ProcessWithoutApprovalComponent', () => {
  let component: ProcessWithoutApprovalComponent;
  let fixture: ComponentFixture<ProcessWithoutApprovalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessWithoutApprovalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessWithoutApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
