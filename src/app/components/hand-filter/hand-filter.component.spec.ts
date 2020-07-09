import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HandFilterComponent } from './hand-filter.component';

describe('HandFilterComponent', () => {
  let component: HandFilterComponent;
  let fixture: ComponentFixture<HandFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HandFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HandFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
