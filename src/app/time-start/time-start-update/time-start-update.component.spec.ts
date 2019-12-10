import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeStartUpdateComponent } from './time-start-update.component';

describe('TimeStartUpdateComponent', () => {
  let component: TimeStartUpdateComponent;
  let fixture: ComponentFixture<TimeStartUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeStartUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeStartUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
