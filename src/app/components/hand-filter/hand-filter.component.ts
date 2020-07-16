import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'hand-filter',
  templateUrl: './hand-filter.component.html',
  styleUrls: ['./hand-filter.component.css']
})
export class HandFilterComponent implements OnInit {

  // output event emitters
  @Output() drawCardEvent = new EventEmitter<boolean>();
  @Output() handFinishedEvent = new EventEmitter<boolean>();
  @Output() resetHandEvent = new EventEmitter<boolean>();

  deckSize;       // TODO - replace this with actual deck size when get a deck obj
  cardValOptions;

  // form
  filterFormGroup;
  sizeOfHand;
  selectedSuits;
  maxCardVal;
  minCardVal;

  constructor() { }

  ngOnInit() {
    this.deckSize = 52;
    this.cardValOptions = ['Ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King'];

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
      maxCardVal: new FormControl(this.cardValOptions[0]),
      minCardVal: new FormControl(this.cardValOptions[0])
    });

    // // TODO - update value for max cards and any other vals needing update
    // this.filterFormGroup.valueChanges.subscribe(newVal => {

    // });
  }


  drawCard() {
    console.log('user drawing card');
    this.drawCardEvent.emit(true);
  }

  handFinished() {
    console.log('in handFinished');
    this.handFinishedEvent.emit(true);
  }

  userReset() {
    let _fgc = this.filterFormGroup.controls;

    // reset form group vals
    _fgc.sizeOfHand.setValue('');
    _fgc.diamondsSuit.setValue(true);
    _fgc.spadesSuit.setValue(true);
    _fgc.clubsSuit.setValue(true);
    _fgc.heartsSuit.setValue(true);
    _fgc.maxCardVal.setValue(this.cardValOptions[0]);
    _fgc.minCardVal.setValue(this.cardValOptions[0]);

    // enable form group and emit reset val event
    this.filterFormGroup.enable();
    this.resetHandEvent.emit();
  }

  submitForm() {
    if (this.filterFormGroup.valid) {
      this.filterFormGroup.disable();
      this.drawCard();
    }
  }

}