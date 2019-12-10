import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeStartOverviewComponent } from './time-start-overview.component';

describe('TimeStartOverviewComponent', () => {
  let component: TimeStartOverviewComponent;
  let fixture: ComponentFixture<TimeStartOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeStartOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeStartOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
