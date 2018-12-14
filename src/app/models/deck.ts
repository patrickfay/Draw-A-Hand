import {Suit} from './suit';

export class Deck {
  spades: Suit;
  hearts: Suit;
  clubs: Suit;
  diamonds: Suit;

  /*
   * Takes a string name of a suit and returns the suit in this deck.
   * 
   * name: A string representing the name of a string.
   */
  getSuit(name: string): Suit {
    if(name === 'spades') {
      return this.spades;
    }else if(name === 'hearts') {
      return this.hearts;
    }else if(name === 'clubs') {
      return this.clubs;
    }else if(name === 'diamonds') {
      return this.diamonds;
    }else{
      console.error(`Invalid suit name. Cannot get suit ${name}.`);
    }
  }

  /* 
   * Returns an array of all suits in this deck.
   */
  getAllSuits(): Suit[] {
    return [this.spades, this.hearts, this.clubs, this.diamonds];
  }
}