# DrawAHand

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.2.3.

## Deck Layout
The Deck is composed of three objects: Deck, Suit, and Card. Each object is shown below
```
Deck: {
  spades: Suit;
  hearts: Suit;
  clubs: Suit;
  diamonds: Suit;
}

Suit: {
  cards: Card[];
  totalCards: number;
}

Card: {
  name: string;
  quantity: number;
}
```
This layout is used so there is no need to shuffle the deck when a card is drawn from it, rather a random index, n, is generated and the nth card in the deck is drawn. Because there are only 4 suits of known sizes, and the quantity of each card in the deck is known, searching for the nth card can be done quickly. There will be at most 17 iterations of suit and card objects to find the nth card, even if there is more than one deck. Adding more decks to the deck being drawn from will only alter 2 fields; Suit.totalCards and Card.quantity.

## Componenets
Only one component is needed, draw-a-hand component.

## Services
2 Services are used. DeckService and SuitService.

###### DeckService
This service is used to generate a MasterDeck to be drawn from. This MasterDeck can be composed of 1 or more decks. Each deck within MasterDeck will be a full deck of 52 cards.

###### SuitService
This service is used to generate full suits, update an existing suit, and get the index of a card within that suit.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
