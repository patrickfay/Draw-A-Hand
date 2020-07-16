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

  numDecks: number;     // total decks user is drawing from (will be 1 for this application)
  MasterDeck: Deck;     // deck user will draw from and alter with filters
  filtDeckData: any;    // filtered deck data, gotten from child filter-hand component when user presses draw btn
  drawnCards: Card[];   // all cards drawn from the deck

  allValues: Array<string>; // all possible values to be displayed in Max/Min dropdowns
  handFinished: boolean;    // hand has been finished or it hasn't

  constructor (
    private deckService: DeckService,
    private drawCardService: DrawCardService
  ) { }

  ngOnInit() {
    this.numDecks = 1;
    this.MasterDeck = this.deckService.getMasterDeck(this.numDecks);
    this.drawnCards = [];
    this.filtDeckData = null;
    this.allValues = ['Ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King'];
    this.handFinished = false;
  }

  // draw card or get user's filtered deck data by emitting isDrawing() broadcast
  handleDrawBtn() {
    !!this.filtDeckData ? this.drawCard() : this.drawCardService.isDrawing();
  }

  // draw one card from the filtered deck
  drawCard() {
    // draw a new card from filtered deck and push it to drawn cards
    this.drawnCards.unshift(this.drawCardService.drawCard(this.filtDeckData.filteredDeck));

    if (this.drawnCards.length === this.filtDeckData.sizeOfHand) this.handFinished = true;
  }

  // gets filtered data from child component then draws the first card
  getFiltAndDraw(_data) {
    this.filtDeckData = _data;
    this.drawCard();
  }

  // reset this hand and all data needed with it
  resetHand() {
    this.MasterDeck = this.deckService.getMasterDeck(this.numDecks);
    this.filtDeckData = null;
    this.handFinished = false;
    this.drawnCards = [];

    // emit reset hand event (will be caught in child components)
    this.drawCardService.resetHand();
  }

}
