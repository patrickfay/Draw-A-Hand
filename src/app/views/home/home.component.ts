import { Component, OnInit } from '@angular/core';

import { Deck } from 'src/app/models/deck';
import { Card } from 'src/app/models/card';

import { DeckService } from '../../services/deck/deck.service';
import { DrawCardService } from '../../services/draw-card/draw-card.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  numDecks: number;   // Total decks user is drawing from (will be 1 for this application)
  MasterDeck: Deck;     // Deck user will draw from and alter with filters
  filtDeckData: any;    // filtered deck data, gotten from child filter-hand component when user presses draw btn
  drawnCards: Card[];   // All cards drawn from the deck

  allValues: Array<string>; // All possible values to be displayed in Max/Min dropdowns
  handFinished: boolean;
  // isDrawing: boolean;       // True if user is drawing cards from deck, false if altering deck to draw from.
  // finishedHand: boolean;    // True if the user has drawn enough cards to fill their hand

  constructor (
    private deckService: DeckService,
    private drawCardService: DrawCardService
  ) { }

  ngOnInit() {
    // init global vars
    this.numDecks = 1;
    this.MasterDeck = this.deckService.getMasterDeck(this.numDecks);
    this.drawnCards = [];
    this.filtDeckData = null;

    this.allValues = ['Ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King'];
    this.handFinished = false;
  }

  handleDrawBtn() {
    // draw card or get user's filtered deck data by emitting isDrawing() broadcast
    !!this.filtDeckData ? this.drawCard() : this.drawCardService.isDrawing();
  }

  drawCard() {
    // draw a new card from filtered deck and push it to drawn cards
    this.drawnCards.unshift(this.drawCardService.drawCard(this.filtDeckData.filteredDeck));

    if (this.drawnCards.length === this.filtDeckData.sizeOfHand) {
      console.log('hand is full fellers');
      this.handFinished = true;
    }

    console.log(this.drawnCards);
  }

  getFiltAndDraw(_data) {
    this.filtDeckData = _data;
    this.drawCard();
  }

  resetHand() {
    this.MasterDeck = this.deckService.getMasterDeck(this.numDecks);
    this.filtDeckData = null;
    this.handFinished = false;
    this.drawnCards = [];

    // emit reset hand event (will be caught in hand-filt component)
    this.drawCardService.resetHand();
  }

}
