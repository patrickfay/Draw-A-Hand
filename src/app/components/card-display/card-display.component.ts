import { Component, OnInit, Input } from '@angular/core';

import { DrawCardService } from '../../services/draw-card/draw-card.service';

@Component({
  selector: 'card-display',
  templateUrl: './card-display.component.html',
  styleUrls: ['./card-display.component.css']
})
export class CardDisplayComponent implements OnInit {

  @Input() cardsArr: Array<string>;
  @Input() handIsFinished: number;

  cardDispHeader: string;
  userDrawingStatus: string;

  constructor(
    private drawCardService: DrawCardService
  ) { }

  ngOnInit() {
    this.cardDispHeader = 'Select Filters & Draw Some Cards!';
    this.userDrawingStatus = 'not-drawing';

    // listen for broadcasted user event and update title
    this.drawCardService.userDrawing.subscribe({
      next: eventName => this.userDrawingStatus = eventName === 'reset-hand' ? 'not-drawing' : eventName
    });
  }
}
