import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Deck } from '../../models/deck';
import { Card } from '../../models/card';

@Injectable({
  providedIn: 'root'
})
export class DrawCardService {

  constructor() { }

  userDrawing = new Subject<string>();


  // draw and return a card from _deck
  drawCard(_deck: Deck): Card {
    let suits = _deck.getAllSuits();
    let randomNum = Math.floor(Math.random() * (_deck.getTotalCards() - 1)) + 1;
    console.log(_deck.getTotalCards(), randomNum);

    for (let i = 0; i < suits.length; i++) {
      // if this suit contains the nth card, find and return it
      if (randomNum <= suits[i].totalCards) {
        let cards = suits[i].cards;

        for (let j = 0; j < cards.length; j++) {
          // if found card, break and return
          if (randomNum === 1 && cards[j].quantity > 0) {
            cards[j].quantity--;
            suits[i].totalCards--;

            return cards[j];
          } else {
            // this is not nth card, subtract this cards quantity and check next card
            randomNum -= cards[j].quantity;
          }
        }

      }else{
        // random card is not in this suit, subtract cards in this suit from n and check next suit
        randomNum -= suits[i].totalCards;
      }
    }

    return null;
  }
  
  
  // EVENT BROADCASTER user click 'Draw' button
  isDrawing(): void {
    this.userDrawing.next('is-drawing');
  }

  // EVENT BROADCASTER user click 'Reset' button
  resetHand() {
    this.userDrawing.next('reset-hand');
  }

}
