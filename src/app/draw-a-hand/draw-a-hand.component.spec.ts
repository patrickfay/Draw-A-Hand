import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawAHandComponent } from './draw-a-hand.component';

describe('DrawAHandComponent', () => {
  let component: DrawAHandComponent;
  let fixture: ComponentFixture<DrawAHandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrawAHandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrawAHandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
