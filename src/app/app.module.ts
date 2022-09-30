import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule}from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import {MatIcon, MatIconModule}from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatInputModule
    
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
