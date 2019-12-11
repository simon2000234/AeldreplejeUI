import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeStartCreateComponent } from './time-start-create.component';

describe('TimeStartCreateComponent', () => {
  let component: TimeStartCreateComponent;
  let fixture: ComponentFixture<TimeStartCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeStartCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeStartCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
