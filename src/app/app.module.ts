import { BrowserModule }                    from '@angular/platform-browser';
import { NgModule }                         from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppComponent }       from './app.component';
import { DrawAHandComponent } from './draw-a-hand/draw-a-hand.component';

@NgModule({
  declarations: [
    AppComponent,
    DrawAHandComponent
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
