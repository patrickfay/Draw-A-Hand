import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'card-display',
  templateUrl: './card-display.component.html',
  styleUrls: ['./card-display.component.css']
})
export class CardDisplayComponent implements OnInit {

  @Input() cardsArr: Array<string>;

  constructor() { }

  ngOnInit() {
    console.log('woohoo in tha card display component!', this.cardsArr);
  }

}
