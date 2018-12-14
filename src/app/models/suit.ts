import {Card} from './card';

/*
 * cards: An array of all cards in this suit.
 * totalCards: The total number of cards in this suit. Can be more than 13 if the user is drawing from more than 1 deck.
 */
export class Suit {
  cards: Card[];
  totalCards: number;
}