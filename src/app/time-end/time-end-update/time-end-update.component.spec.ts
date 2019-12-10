import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeEndUpdateComponent } from './time-end-update.component';

describe('TimeEndUpdateComponent', () => {
  let component: TimeEndUpdateComponent;
  let fixture: ComponentFixture<TimeEndUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeEndUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeEndUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
