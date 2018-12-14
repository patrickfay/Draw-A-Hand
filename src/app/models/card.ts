/* 
 * name: a string that represents the name of the card. ex. '2H' for 2 of Hearts
 * quantity: a number representing the total number of this card present in the MasterDeck.
 * 
 * quantity will always be 1 or 0 for this application, but will be greater if multiple decks are being drawn from.
 */

export class Card {
  name: string;
  quantity: number;
}