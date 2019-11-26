import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiftOverviewComponent } from './shift-overview.component';

describe('ShiftOverviewComponent', () => {
  let component: ShiftOverviewComponent;
  let fixture: ComponentFixture<ShiftOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShiftOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShiftOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
