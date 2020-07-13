import { Component, OnInit } from '@angular/core';

import { Deck } from 'src/app/models/deck';
import { Card } from 'src/app/models/card';

import { DeckService } from '../../services/deck.service';
import { SuitService } from '../../services/suit.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  totalDecks: number;   // Total decks user is drawing from (will be 1 for this application)
  MasterDeck: Deck;     // Deck user will draw from and alter with filters
  totalCards: number;   // Total cards currently in MasterDeck
  drawnCards: Card[];   // All cards drawn from the deck

  allValues: Array<string>; // All possible values to be displayed in Max/Min dropdowns
  isDrawing: boolean;       // True if user is drawing cards from deck, false if altering deck to draw from.
  finishedHand: boolean;    // True if the user has drawn enough cards to fill their hand

  constructor (
    private deckService: DeckService,
    private suitService: SuitService
  ) { }

  ngOnInit() {
    // init global vars
    this.totalDecks = 1;
    this.MasterDeck = this.deckService.getMasterDeck(this.totalDecks);
    this.totalCards = this.MasterDeck.clubs.totalCards * 4;
    // this.drawnCards = [];
    this.drawnCards = this.MasterDeck.diamonds.cards;

    this.allValues = ['Ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King'];
    this.isDrawing = false;
    this.finishedHand = false;
  }

  parentIsDrawing() {
    this.isDrawing = true;
    this.finishedHand = false;
    console.log('in PARENT\n****Draw Card****', this.isDrawing);
  }

  parentHandFinished() {
    this.isDrawing = false;
    this.finishedHand = true;
    console.log('in PARENT\n****Hand is FINISHED****', this.finishedHand);
  }

  parentResetHand() {
    console.log('in PARENT\n****RESETING HAND****');
  }
}
