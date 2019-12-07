import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiftChooseComponent } from './shift-choose.component';

describe('ShiftChooseComponent', () => {
  let component: ShiftChooseComponent;
  let fixture: ComponentFixture<ShiftChooseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShiftChooseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShiftChooseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
