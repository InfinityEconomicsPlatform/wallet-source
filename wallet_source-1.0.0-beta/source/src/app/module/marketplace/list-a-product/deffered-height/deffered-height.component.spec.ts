import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DefferedHeightComponent } from './deffered-height.component';

describe('DefferedHeightComponent', () => {
  let component: DefferedHeightComponent;
  let fixture: ComponentFixture<DefferedHeightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefferedHeightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefferedHeightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
