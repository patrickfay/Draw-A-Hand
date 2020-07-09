import { BrowserModule }                    from '@angular/platform-browser';
import { NgModule }                         from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppComponent }         from './app.component';
import { DrawAHandComponent }   from './draw-a-hand/draw-a-hand.component';
import { HomeComponent }        from './views/home/home.component';
import { CardDisplayComponent } from './components/card-display/card-display.component';
import { HandFilterComponent }  from './components/hand-filter/hand-filter.component';

@NgModule({
  declarations: [
    AppComponent,
    DrawAHandComponent,
    HomeComponent,
    CardDisplayComponent,
    HandFilterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
