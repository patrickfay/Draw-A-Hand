import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'hand-filter',
  templateUrl: './hand-filter.component.html',
  styleUrls: ['./hand-filter.component.css']
})
export class HandFilterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log('woohoo in the hand filter component!');
  }

}
