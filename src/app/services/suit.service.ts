import { Injectable } from '@angular/core';

import { Suit } from '../models/suit';
import { Card } from '../models/card';

import { cards } from '../data/cards';

@Injectable({
  providedIn: 'root'
})
export class SuitService {

  constructor() { }

  /* 
   * Returns a full Suit specified by the symbol of the suit.
   *
   * symbol: Symbol for the current suit. ex. symbol = 'H' for Hearts suit.
   * numDecks: A number representing the number of decks the user wants to draw from.
   */
  getSuit(symbol: string, numDecks: number): Suit {
    var cardData = cards;       // Card Template from data folder
    var returnSuit = new Suit;  // Suit to be returned

    // Set cards this suit will contain to suitCards
    var suitCards = cardData.map(card => {
      var newCard = new Card;

      newCard.name = card.name + symbol;
      newCard.quantity = numDecks;
      return newCard;
    });

    returnSuit.cards = suitCards;
    returnSuit.totalCards = cardData.length * numDecks;

    return returnSuit;
  }

  /*
   * Takes a max (inclusive) and min (inclusive) value for a suit and sets all cards outside of this range to have a total quantity of 0.
   *
   * suit: The suit being altered.
   * max: A string representing the face value for the maximum value card to remain in this suit.
   * min: A string representing the face value for the minimum value card  to remain in this suit.
   * decks: A number representing the number of decks the user is drawing from.
   */
  updateSuit(suit: Suit, max: string, min: string, decks: number): void {
    var maxVal = this.getValue(max, 'max');
    var minVal = this.getValue(min, 'min');
    var cardsInSuit = 0;

    for(var i = 0; i < suit.cards.length; i++) {
      if(i < minVal || i > maxVal) {
        suit.cards[i].quantity = 0;
      }else{
        suit.cards[i].quantity = decks;
        cardsInSuit += decks;
      }
    }

    suit.totalCards = cardsInSuit;
  }

  /* 
   * Returns the index of a card in a complete suit.
   * This function is called when a user changes the min or max dropdown value.
   * 
   * cardVal: A string representing the face value of a card (ie. King, 4, Ace, etc).
   * filter: A string representing the filter value of 'max' or 'min'.
   */
  getValue(cardVal: string, filter: string): number {
    // If the user didn't specify a value, value is max or min
    if(cardVal === '-select-') {
      if(filter === 'max') {
        return 12;
      }else{
        return 0;
      }
    }else if(cardVal === 'Jack') {
      return 10;
    }else if(cardVal === 'Queen') {
      return 11;
    }else if(cardVal === 'King') {
      return 12;
    }else if(cardVal === 'Ace'){
      return 0;
    }else{
      return parseInt(cardVal) - 1;
    }
  }
}
