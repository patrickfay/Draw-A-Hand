import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Deck } from '../../models/deck';

import { SuitService } from '../../services/suit/suit.service';
import { DrawCardService } from '../../services/draw-card/draw-card.service';

@Component({
  selector: 'hand-filter',
  templateUrl: './hand-filter.component.html',
  styleUrls: ['./hand-filter.component.css']
})
export class HandFilterComponent implements OnInit {

  // deck that will be altered as user updates filters
  @Input() deck: Deck;

  // output event emitters
  @Output() filteredDeckEvent = new EventEmitter<any>();

  deckSize: number;       // TODO - replace this with actual deck size when get a deck obj
  allCardValOpts: Array<string>;

  // form
  filterFormGroup;
  sizeOfHand;
  selectedSuits;
  maxCardVal;
  minCardVal;

  constructor(
    private suitService: SuitService,
    private drawCardService: DrawCardService
  ) { }

  ngOnInit() {
    this.deckSize = 52;
    this.allCardValOpts = ['-select-', 'Ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King'];

    this.filterFormGroup = new FormGroup({
      sizeOfHand: new FormControl('', [
        Validators.required,
        Validators.min(1),
        Validators.max(this.deckSize)
      ]),
      diamondsSuit: new FormControl(true),
      spadesSuit: new FormControl(true),
      clubsSuit: new FormControl(true),
      heartsSuit: new FormControl(true),
      maxCardVal: new FormControl(this.allCardValOpts[0]),
      minCardVal: new FormControl(this.allCardValOpts[0])
    });

    // handle checkbox value change events
    ['diamonds', 'spades', 'clubs', 'hearts'].forEach(_suit => {
      this.filterFormGroup.controls[`${_suit}Suit`].valueChanges.subscribe(newVal => this.checkboxUpdate(_suit, newVal));
    });

    // listen for broadcasted user event (clicking draw btn or reset btn)
    this.drawCardService.userDrawing.subscribe({
      next: eventName => this.handleBroadcastedEvent(eventName)
    });
  }


  // updates deck suit and card values when user selects/unselects a suit checkbox (note, does not handle decksize of 0)
  checkboxUpdate(_suitName: string, _newVal: boolean): void {
    let currSuit = this.deck.getSuit(_suitName);

    // if user checked this box
    if (_newVal) {
      // get current dropdown vals
      let max = this.filterFormGroup.controls.maxCardVal.value;
      let min = this.filterFormGroup.controls.minCardVal.value;
    
      // add cards to this suit using max and min vals from dropdown
      this.suitService.updateSuit(currSuit, max, min, 1);
    } else {
      // set all cards in currSuit to a quantity of 0 and set total cards to 0
      currSuit.cards.forEach(card => card.quantity = 0);
      currSuit.totalCards = 0;
    }

    this.deckSize = this.deck.getTotalCards();

    // reset validator for max handsize and recheck curr values validity
    this.filterFormGroup.controls.sizeOfHand.setValidators(Validators.max(this.deckSize));
    this.filterFormGroup.controls.sizeOfHand.updateValueAndValidity();
  }

  // reset filter values
  resetFilter() {
    let _fgc = this.filterFormGroup.controls;

    // reset form group vals
    _fgc.sizeOfHand.setValue('');
    _fgc.diamondsSuit.setValue(true);
    _fgc.spadesSuit.setValue(true);
    _fgc.clubsSuit.setValue(true);
    _fgc.heartsSuit.setValue(true);
    _fgc.maxCardVal.setValue(this.allCardValOpts[0]);
    _fgc.minCardVal.setValue(this.allCardValOpts[0]);

    // enable form group
    this.filterFormGroup.enable();
  }

  // handle broadcasted event cause by user clicking the 'Draw' btn or the 'Reset' btn
  handleBroadcastedEvent(eventName: string) {
    if (eventName === 'is-drawing') {
      if (this.filterFormGroup.valid) {
        console.log('isDrawing and valid');

        // if the form is valid and the user clicked draw for the first time, return the filtered deck to parent component
        if (this.filterFormGroup.enabled) {
          this.filterFormGroup.disable();
          this.filteredDeckEvent.emit(this.deck);
        }  
      }

    } else if (eventName === 'reset-hand') {
      console.log('reset hand');
      this.resetFilter();
    }
  }

}