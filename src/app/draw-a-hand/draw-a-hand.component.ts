import { Component, OnInit, ViewChild } from '@angular/core';

import { DeckService } from '../services/deck.service';
import { SuitService } from '../services/suit.service';

import { Deck } from '../models/deck';
import { Card } from '../models/card';

@Component({
  selector: 'app-draw-a-hand',
  templateUrl: './draw-a-hand.component.html',
  styleUrls: ['./draw-a-hand.component.css']
})
export class DrawAHandComponent implements OnInit {
  totalDecks: number;   // Total decks user is drawing from (will be 1 for this application)
  MasterDeck: Deck;     // Deck user will draw from and alter with filters
  totalCards: number;   // Total cards currently in MasterDeck
  drawnCards: Card[];   // All cards drawn from the deck

  allValues = ['Ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King']; // All possible values to be displayed in Max/Min dropdowns
  sizeInputMsg: string; // Placeholder for hand size input field
  maxValues: string[];  // Displayed values for Max Value dropdown
  minValues: string[];  // Displayed values for Min Value dropdown

  invalidHandSize: boolean; // True if an invalid hand size was chosen before drawing
  isDrawing: boolean;       // True if user is drawing cards from deck, false if altering deck to draw from.
  finishedHand: boolean;    // True if the user has drawn enough cards to fill their hand

  @ViewChild('handSize') handSize;        // Size of hand element user wants
  @ViewChild('diamonds') diamondsButton;  // Diamonds checkbox button element (var only used for reseting values)
  @ViewChild('spades') spadesButton;      // Sapdes checkbox button element (var only used for reseting values)
  @ViewChild('clubs') clubsButton;        // Clubs checkbox button element (var only used for reseting values)
  @ViewChild('hearts') heartsButton;      // Hearts checkbox button element (var only used for reseting values)
  @ViewChild('maxVal') maxCardVal;        // Max card dropdown element
  @ViewChild('minVal') minCardVal;        // Min card dropdown element

  constructor( 
    private deckService: DeckService,
    private suitService: SuitService
  ) { }

  ngOnInit() {
    // Initialize Global Variables
    this.totalDecks = 1;
    this.MasterDeck = this.deckService.getMasterDeck(this.totalDecks);
    this.totalCards = this.MasterDeck.clubs.totalCards * 4;
    this.sizeInputMsg = `1 - ${this.totalCards}`;
    this.drawnCards = [];

    this.maxValues = this.allValues;
    this.minValues = this.allValues;

    this.invalidHandSize = false;
    this.isDrawing = false;
    this.finishedHand = false;
  }

  /* 
   * Updates MasterDeck according to filter chosen, also updates filter values.
   * This function is called whenever a user clicks a suit checkbox.
   *
   * event: The event triggered by a user clicking a checkbox.
   */
  updateValuesCheckbox(event): void {
    // Get the suit of clicked checkbox
    var currSuit = this.MasterDeck.getSuit(event.srcElement.name);

    // If the user unchecked currSuit checkbox
    if(!event.target.checked){
      // Set all cards in currSuit to a quantity of 0 and set total cards to 0
      currSuit.cards.forEach(card => card.quantity = 0);
      currSuit.totalCards = 0;
    }else{
      // Get current max dropdown value and min dropdown value
      var max = this.maxCardVal.nativeElement.value;
      var min = this.minCardVal.nativeElement.value;

      // Add cards to currSuit according to the values of the maxCardVal and minCardVal
      this.suitService.updateSuit(currSuit, max, min, this.totalDecks);
    }

    this.setTotalCards();
  }

  /* 
   * Updates MasterDeck according to Max or Min value chosen.
   * This function is called whenever a user changes the Max Value or Min Value dropdown.
   */
  updateValuesMaxMin(): void {
    // Get current max dropdown value and min dropdown value
    var max = this.maxCardVal.nativeElement.value;
    var min = this.minCardVal.nativeElement.value;

    // Update possible dropdown values for max and min (so there can't be invalid input)
    this.updateDropdownVals(max, min);

    // Get all suits in the deck
    var allSuits = this.MasterDeck.getAllSuits();

    // For each suit, if it currently has more than one card in it, adjust the range of cards within the suit
    allSuits.forEach(suit => 
      suit.totalCards > 0 ? this.suitService.updateSuit(suit, max, min, this.totalDecks) : ''
    );

    this.setTotalCards();
  }

  // Resets the totalCards variable after a filter is altered and updates sizeInputMsg accordingly.
  setTotalCards(): void {
    var userHandSize = this.handSize.nativeElement.value;

    this.totalCards = this.MasterDeck.spades.totalCards + this.MasterDeck.hearts.totalCards +
                      this.MasterDeck.clubs.totalCards + this.MasterDeck.diamonds.totalCards;

    if(this.totalCards > 0) {
      this.sizeInputMsg = `1 - ${this.totalCards}`;

      // If the user's input is to large for current deck, make input invalid
      userHandSize > this.totalCards ? this.invalidHandSize = true : this.invalidHandSize = false;
    }else{
      this.sizeInputMsg = '0 Cards Are In This Deck';
      this.invalidHandSize = true;
    }
  }

  /* 
   * Updates max and min dropdown selectable values to prevent invalid input.
   *
   * max: A string representing the value chosen for Max Card Value dropdown.
   * min: A string representing the value chosen for Min Card Value dropdown.
   */
  updateDropdownVals(max: string, min: string): void {
    // Get index of maxVal and minVal in this.allValues
    var maxVal = this.suitService.getValue(max, 'max');
    var minVal = this.suitService.getValue(min, 'min');

    // Adjust choosable values for dropdowns so no invalid input occurs
    this.maxValues = this.allValues.slice(minVal, this.allValues.length);
    this.minValues = this.allValues.slice(0, maxVal + 1);
  }

  /* 
   * Checks if number entered in hand size bar is valid.
   * Called each time a user enters a number in hand size input field.
   * 
   * value: The number the user inputed into the hand size input field.
   */
  handLengthIsValid(value: number): void {
    value > this.totalCards ? this.invalidHandSize = true : this.invalidHandSize = false;
  }

  /*
   * Returns true if the user's input is valid for drawing cards.
   * If returns false, alerts user why invalid.
   */
  vaildInput(): boolean {
    // If the total cards in the deck > 0 and the hand size is not larger than the deck, return true
    if(this.totalCards > 0 && !this.invalidHandSize) {
      // Check if the user entered a hand size
      if(this.handSize.nativeElement.value === ''){
        this.sizeInputMsg = `Please Select A Hand Size (Deck Size: ${this.totalCards})`;
        this.invalidHandSize = true;

        return false;
      }else if(this.handSize.nativeElement.value <= 0){
        // Check if user entered a number larger than 0
        this.invalidHandSize = true;
        return false;
      }

      return true;
    }else{
      if(this.totalCards == 0){
        // If there are no cards in the deck, alert the user
        this.sizeInputMsg = 'Please Select A Deck To Draw From';
        this.handSize.nativeElement.value = '';
      }
      return false;
    }
  }

  /* 
   * Returns a card at nth index of MasterDeck.
   * Searches all suits, determines if index n is within suit.totalCards if not subtracts totalCards from n and checks next suit.
   * When it finds the suit with the nth card, uses similar process when going through suit.cards.
   * 
   * n: A random number representing the index of a card to draw from MasterDeck.
   */
  getCard(n: number): Card {
    // Get all suits in this deck
    var suits = this.MasterDeck.getAllSuits();

    for(var i = 0; i < suits.length; i++){
      // If this suit contains the nth card, find and return it
      if(n <= suits[i].totalCards){
        var cards = suits[i].cards;

        for(var j = 0; j < cards.length; j++){
          // If at nth card in deck, return it and adjust values
          if(n === 1 && cards[j].quantity > 0){
            cards[j].quantity--;
            suits[i].totalCards--;
            this.totalCards--;

            return cards[j];
          }else{
            // This is not nth card, subtract this cards quantity and check next card
            n -= cards[j].quantity;
          }
        }

      }else{
        // nth Card is not in this suit, subtract cards in this suit from n and check next suit
        n -= suits[i].totalCards;
      }
    }
  }

  /* 
   * Draws card from the filtered deck.
   * Called when the user presses the Draw button.
   */
  draw(): void {
    // If this is first time the user attempts to draw from this deck
    if(!this.isDrawing){
      // If the input is valid, lock filter fields and adjust dropdown values if necessary
      if(this.vaildInput()){
        this.isDrawing = true;

        if(this.maxCardVal.nativeElement.value === '-select-'){
          this.maxCardVal.nativeElement.value = 'King';
        }
        if(this.minCardVal.nativeElement.value === '-select-'){
          this.minCardVal.nativeElement.value = 'Ace';
        }
      }else{
        // return if input is invalid
        return;
      }
    }

    var handSize = this.handSize.nativeElement.value;

    // If hand isn't complete
    if(this.drawnCards.length < handSize) {
      // Get random number to find random card in deck (see getCard())
      var randomNum = Math.floor(Math.random() * (this.totalCards - 1)) + 1;

      // Add a random card to front of drawnCards
      this.drawnCards.unshift(this.getCard(randomNum));

      // If hand is finsihed, update view
      if(this.drawnCards.length == handSize){
        this.finishedHand = true;
      }
    }
  }

  /*
   * Resets all Deck and Filter values.
   * Called when a user clicks the Reset Button. 
   */
  resetDeck(): void {
    this.MasterDeck = this.deckService.getMasterDeck(this.totalDecks);
    this.totalCards = this.MasterDeck.clubs.totalCards * 4;
    this.sizeInputMsg = `1 - ${this.totalCards}`;
    this.drawnCards = [];

    this.maxValues = this.allValues;
    this.minValues = this.allValues;

    this.handSize.nativeElement.value = '';
    this.diamondsButton.nativeElement.checked = true;
    this.spadesButton.nativeElement.checked = true;
    this.clubsButton.nativeElement.checked = true;
    this.heartsButton.nativeElement.checked = true;
    this.maxCardVal.nativeElement.value = '-select-';
    this.minCardVal.nativeElement.value = '-select-';

    this.invalidHandSize = false;
    this.isDrawing = false;
    this.finishedHand = false;
  }

}
