import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeEndCreateComponent } from './time-end-create.component';

describe('TimeEndCreateComponent', () => {
  let component: TimeEndCreateComponent;
  let fixture: ComponentFixture<TimeEndCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeEndCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeEndCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
