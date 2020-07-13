import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'hand-filter',
  templateUrl: './hand-filter.component.html',
  styleUrls: ['./hand-filter.component.css']
})
export class HandFilterComponent implements OnInit {

  @Output() drawCardEvent = new EventEmitter<boolean>();
  @Output() handFinishedEvent = new EventEmitter<boolean>();
  @Output() resetHandEvent = new EventEmitter<boolean>();


  constructor() { }

  ngOnInit() {
  }

  drawCard() {
    console.log('user drawing card');
    this.drawCardEvent.emit(true);
  }

  handFinished() {
    console.log('in handFinished');
    this.handFinishedEvent.emit(true);
  }

  userReset() {
    console.log('user reset deck');
    this.resetHandEvent.emit();
  }

}
