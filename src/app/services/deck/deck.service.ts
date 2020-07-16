import { Injectable } from '@angular/core';

import { SuitService }  from '../suit/suit.service';

import { Deck } from '../../models/deck';

@Injectable({
  providedIn: 'root'
})
export class DeckService {

  constructor( private suitService: SuitService ) { }

  /* 
   * Returns a full Deck.
   * 
   * numDecks: The number of decks the user wants to draw from.
   */
  getMasterDeck(numDecks: number): Deck {
    if(numDecks < 1){
      console.error(`Cannot generate ${numDecks} decks.`);
      return;
    }

    var deck: Deck = new Deck;

    deck.spades = this.suitService.getSuit('S', numDecks);
    deck.hearts = this.suitService.getSuit('H', numDecks);
    deck.clubs = this.suitService.getSuit('C', numDecks);
    deck.diamonds = this.suitService.getSuit('D', numDecks);

    return deck;
  }

}
