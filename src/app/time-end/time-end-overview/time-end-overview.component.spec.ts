import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeEndOverviewComponent } from './time-end-overview.component';

describe('TimeEndOverviewComponent', () => {
  let component: TimeEndOverviewComponent;
  let fixture: ComponentFixture<TimeEndOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeEndOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeEndOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
