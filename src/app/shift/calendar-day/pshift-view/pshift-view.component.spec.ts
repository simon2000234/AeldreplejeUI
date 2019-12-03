import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PshiftViewComponent } from './pshift-view.component';

describe('PshiftViewComponent', () => {
  let component: PshiftViewComponent;
  let fixture: ComponentFixture<PshiftViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PshiftViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PshiftViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
