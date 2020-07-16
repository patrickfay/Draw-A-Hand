import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DrawCardService {

  constructor() { }

  userDrawing = new Subject<string>();

  
  // user click 'Draw' button
  isDrawing(): void {
    this.userDrawing.next('is-drawing');
  }

  // the user's hand has finished
  // handCompleted() {
  //   this.userDrawing.next('hand-completed');
  // }

  // user click 'Reset' button
  resetHand() {
    this.userDrawing.next('reset-hand');
  }

}
